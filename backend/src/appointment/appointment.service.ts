import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment as AppointmentEntity } from '../entities/typeorm/appointment.entity';
import { AppointmentList } from './entities/appointment_list.entity';
import { Appointment } from './entities/appointment.entity';
import { randomUUID } from 'crypto';
import { ServiceErrorHandler } from '../decorators/service-error-handler.decorator';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private appointmentRepository: Repository<AppointmentEntity>,
    private paymentService: PaymentService,
  ) {}

  private handleUserIdType({ customer_uid, professional_uid }: UserIdType): {
    customer?: any;
    professional?: any;
  } {
    const criteria: { customer?: any; professional?: any } = {};
    if (customer_uid) criteria.customer = { uid: customer_uid };
    if (professional_uid) criteria.professional = { uid: professional_uid };
    return criteria;
  }

  @ServiceErrorHandler
  async create(createAppointmentDto: CreateAppointmentDto): Promise<void> {
    const uid = randomUUID();
    const payment = await this.paymentService.create({
      product_id: createAppointmentDto.product_id,
      payer_uid: createAppointmentDto.customer_uid as string,
      receiver_uid: createAppointmentDto.professional_uid as string,
    });
    await this.appointmentRepository.save({
      ...createAppointmentDto,
      customer: { uid: createAppointmentDto.customer_uid },
      professional: { uid: createAppointmentDto.professional_uid },
      uid,
      payment,
    } as AppointmentEntity);
  }

  @ServiceErrorHandler
  async findAll(userIdType: UserIdType): Promise<AppointmentList> {
    let result: AppointmentEntity[] = [];

    result = await this.appointmentRepository
      .createQueryBuilder('appointments')
      .leftJoinAndSelect('appointments.customer', 'customers')
      .leftJoinAndSelect('appointments.professional', 'professionals')
      .where(this.handleUserIdType(userIdType))
      .getMany();

    return { data: result.map((appointment) => new Appointment(appointment)) };
  }

  @ServiceErrorHandler
  async findOne(uid: string, userIdType: UserIdType): Promise<Appointment> {
    const result = await this.appointmentRepository
      .createQueryBuilder('appointments')
      .leftJoinAndSelect('appointments.customer', 'customers')
      .leftJoinAndSelect('appointments.professional', 'professionals')
      .leftJoinAndSelect('appointments.payment', 'payments')
      .where({
        uid,
        ...this.handleUserIdType(userIdType),
      })
      .getOneOrFail();
    return new Appointment(result);
  }

  @ServiceErrorHandler
  async update(
    uid: string,
    userIdType: UserIdType,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<void> {
    updateAppointmentDto.customer_uid = undefined;
    updateAppointmentDto.professional_uid = undefined;
    await this.appointmentRepository.update(
      {
        uid,
        ...this.handleUserIdType(userIdType),
      },
      updateAppointmentDto,
    );
  }

  @ServiceErrorHandler
  async remove(uid: string, userIdType: UserIdType): Promise<void> {
    await this.appointmentRepository.update(
      {
        uid,
        ...this.handleUserIdType(userIdType),
      },
      { status: 'cancelled' },
    );
  }
}

export interface UserIdType {
  customer_uid?: string;
  professional_uid?: string;
}
