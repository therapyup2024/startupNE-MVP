import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '../entities/typeorm/appointment.entity';
import { Professional } from '../entities/typeorm/professional.entity';
import { Customer } from '../entities/typeorm/customer.entity';
import { PaymentService } from '../payment/payment.service';
import { Payment } from '../entities/typeorm/payment.entity';
import { Product } from '../entities/typeorm/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Appointment,
      Professional,
      Customer,
      Payment,
      Product,
    ]),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, PaymentService],
})
export class AppointmentModule {}
