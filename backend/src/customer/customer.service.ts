import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CustomerAgreement,
  Customer as CustomerEntity,
} from '../entities/typeorm/customer.entity';
import { In, Repository } from 'typeorm';
import { Agreement } from '../entities/typeorm/agreement.entity';
import { SecurityUtil } from '../utils/security.util';
import { UidUtil } from '../utils/uid.util';
import { StatusService } from '../status/status.service';
import { CustomerList } from './entities/customer_list.entity';
import { Customer } from './entities/customer.entity';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { randomUUID } from 'crypto';
import { CustomerPending } from './entities/customer_pending.entity';
import { ValidateEmailCustomerDto } from './dto/validate-email-customer.dto';
import { ServiceErrorHandler } from '../decorators/service-error-handler.decorator';
import { Role } from '../auth/roles.decorator';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
    @InjectRepository(Agreement)
    private agreementRepository: Repository<Agreement>,
    @InjectRepository(CustomerAgreement)
    private customerAgreementRepository: Repository<CustomerAgreement>,
    private securityUtil: SecurityUtil,
    private uidUtil: UidUtil,
    private statusService: StatusService,
  ) {}

  @ServiceErrorHandler
  async create(createCustomerDto: CreateCustomerDto): Promise<CustomerPending> {
    const password_hash = await this.securityUtil.hash(
      createCustomerDto.password,
    );

    const uid = this.uidUtil.generateUid();

    const customer: CustomerEntity = {
      ...createCustomerDto,
      password_hash,
      uid,
      status: 'pending_verification',
    };

    await this.customerRepository.save(customer);
    const message = await this.statusService.sendStatusValidation({
      ...(customer as any),
      type: Role.Customer,
    });

    if (createCustomerDto.agreement_ids) {
      const agreements = await this.agreementRepository.find({
        where: { id: In(createCustomerDto.agreement_ids) },
      });
      for (const agreement of agreements) {
        const customerAgreementUid = randomUUID();
        await this.customerAgreementRepository.save({
          uid: customerAgreementUid,
          agreement,
          customer: { ...customer, uid },
        });
      }
    }

    return { email: customer.email as string, message: message || '' };
  }

  @ServiceErrorHandler
  async validateEmail(
    validateEmailCustomerDto: ValidateEmailCustomerDto,
  ): Promise<void> {
    const customer = await this.customerRepository.findOneByOrFail({
      email: validateEmailCustomerDto.email,
      status: 'pending_verification',
    });

    const code = this.statusService.createActivationCode(customer as any);
    if (code != validateEmailCustomerDto.code)
      throw new BadRequestException('Dados inválidos');

    await this.customerRepository.update(
      { uid: customer.uid },
      {
        status: 'active',
      },
    );
  }

  @ServiceErrorHandler
  async findAll(): Promise<CustomerList> {
    const customers = await this.customerRepository.find({
      where: { status: 'active' },
    });
    return {
      data: customers.map((element) => new Customer(element)),
    };
  }

  @ServiceErrorHandler
  async findOne(uid: string): Promise<Customer> {
    const customer = await this.customerRepository.findOneOrFail({
      where: { uid },
    });
    return new Customer(customer);
  }

  @ServiceErrorHandler
  async update(
    uid: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<void> {
    const customer = {
      ...updateCustomerDto,
      status: undefined,
      password_hash: undefined,
      uid: undefined,
      agreement_ids: undefined,
    };

    await this.customerRepository.update({ uid }, customer);

    if (updateCustomerDto.agreement_ids) {
      const agreements = await this.agreementRepository.find({
        where: { id: In(updateCustomerDto.agreement_ids) },
      });
      for (const agreement of agreements) {
        const customerAgreementUid = randomUUID();
        await this.customerAgreementRepository.save({
          uid: customerAgreementUid,
          agreement,
          customer: { ...customer, uid },
        });
      }
    }
  }

  @ServiceErrorHandler
  async remove(uid: string): Promise<void> {
    const customer = await this.customerRepository.findOneOrFail({
      where: { uid },
    });
    customer.status = 'inactive';
    await this.customerRepository.update({ uid }, customer);
  }
}
