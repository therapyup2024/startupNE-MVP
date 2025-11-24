import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment as PaymentEntity } from '../entities/typeorm/payment.entity';
import { CreateEfiBankPaymentLinkDto } from './dto/create-efi-bank_payment-link.dto';
import { EfiBankPaymentLink } from './entities/efi-bank_payment-link.entity';
import axios from 'axios';
import { Product } from '../entities/typeorm/product.entity';
import { UserIdType } from '../appointment/appointment.service';
import { Customer } from '../entities/typeorm/customer.entity';
import { Professional } from '../entities/typeorm/professional.entity';
import { Payment } from './entities/payment.entity';
import { PaymentList } from './entities/payment_list.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentEntity>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  private handleUserIdType({ customer_uid, professional_uid }: UserIdType): {
    payer?: Customer;
    receiver?: Professional;
  } {
    const criteria: { payer?: any; receiver?: any } = {};
    if (customer_uid) criteria.payer = { uid: customer_uid };
    if (professional_uid) criteria.receiver = { uid: professional_uid };
    return criteria;
  }

  private async createEfiBankPaymentLink(
    linkData: CreateEfiBankPaymentLinkDto,
  ): Promise<EfiBankPaymentLink> {
    if (
      !process.env.EFI_BANK_AUTHORIZE_URL ||
      !process.env.EFI_BANK_CREATE_LINK_URL
    )
      throw new InternalServerErrorException('No link creation url found');

    if (!process.env.EFI_BANK_CLIENT_ID || !process.env.EFI_BANK_CLIENT_SECRET)
      throw new InternalServerErrorException(
        'No link creation credentials found',
      );

    const authorizationResult = await axios.post(
      process.env.EFI_BANK_AUTHORIZE_URL,
      {
        grant_type: 'client_credentials',
      },
      {
        auth: {
          username: process.env.EFI_BANK_CLIENT_ID,
          password: process.env.EFI_BANK_CLIENT_SECRET,
        },
      },
    );

    const token = authorizationResult?.data?.access_token;

    if (!token)
      throw new InternalServerErrorException(
        'No link creation credentials found',
      );

    const paymentLinkResult = await axios.post(
      process.env.EFI_BANK_CREATE_LINK_URL,
      {
        ...linkData,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );

    return paymentLinkResult.data as EfiBankPaymentLink;
  }

  private getExpirationDate(): string {
    const today = new Date();
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);

    const year = nextDay.getFullYear();
    const month = String(nextDay.getMonth() + 1).padStart(2, '0');
    const day = String(nextDay.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const product = await this.productRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.professional', 'professionals')
      .where({
        id: createPaymentDto.product_id,
      })
      .getOneOrFail();

    if (createPaymentDto.receiver_uid !== product?.professional?.uid)
      throw new BadRequestException(
        'professional defined is not the product owner',
      );

    const payment = await this.paymentRepository.save({
      ...createPaymentDto,
      value: product.value,
      description: product.description,
      product: { id: createPaymentDto.product_id },
      payer: { uid: createPaymentDto.payer_uid },
      receiver: { uid: createPaymentDto.receiver_uid },
    } as PaymentEntity);

    const paymeltLink = await this.createEfiBankPaymentLink({
      items: [
        {
          amount: 1,
          value: product.value as number,
          name: product.name as string,
        },
      ],
      metadata: {
        notification_url: process.env?.API_HOST
          ? process.env.API_HOST.match('https://')
            ? process.env.API_HOST + '/payment/' + payment.id
            : undefined
          : undefined,
      },
      settings: {
        payment_method: 'credit_card',
        request_delivery_address: false,
        expire_at: this.getExpirationDate(),
      },
    });

    await this.paymentRepository.update(
      {
        id: payment.id,
      },
      {
        link_url: paymeltLink.data.payment_url,
      } as PaymentEntity,
    );

    return new Payment({ ...payment, link_url: paymeltLink.data.payment_url });
  }

  async findAll(userIdData: UserIdType): Promise<PaymentList> {
    const resultData = await this.paymentRepository.findBy({
      ...this.handleUserIdType(userIdData),
    });

    return { data: resultData.map((payment) => new Payment(payment)) };
  }

  async findOne(id: number, userIdData: UserIdType): Promise<Payment> {
    const payment = await this.paymentRepository
      .createQueryBuilder('payments')
      .leftJoinAndSelect('payments.payer', 'customers')
      .leftJoinAndSelect('payments.receiver', 'professionals')
      .leftJoinAndSelect('payments.product', 'products')
      .where({
        id,
        ...this.handleUserIdType(userIdData),
      })
      .getOneOrFail();

    return new Payment(payment);
  }

  async update(id: number, updatePaymentDto: any): Promise<void> {
    Logger.error('Updating ' + id);
    Logger.error(updatePaymentDto);
    Logger.error(id + 'Updated');
    return Promise.resolve();
  }

  async remove(id: number): Promise<void> {
    await this.paymentRepository.update(
      {
        id,
      },
      {
        status: 'inactive',
      } as PaymentEntity,
    );
  }
}
