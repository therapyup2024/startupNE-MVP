import { ApiProperty } from '@nestjs/swagger';
import { Appointment as AppointmentTypeorm } from '../../entities/typeorm/appointment.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { Professional } from '../../professional/entities/professional.entity';
import { Payment } from '../../payment/entities/payment.entity';

export class Appointment
  implements
    Omit<
      AppointmentTypeorm,
      'status' | 'updated_at' | 'created_at' | 'customer' | 'professional'
    >
{
  @ApiProperty()
  uid?: string;

  @ApiProperty()
  title?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  notes?: string;

  @ApiProperty()
  start_at?: Date;

  @ApiProperty()
  finish_at?: Date;

  @ApiProperty()
  customer?: Customer;

  @ApiProperty()
  professional?: Professional;

  @ApiProperty()
  payment?: Payment;

  constructor({
    uid,
    title,
    description,
    notes,
    start_at,
    finish_at,
    customer,
    professional,
    payment,
  }: AppointmentTypeorm) {
    this.uid = uid;
    this.title = title;
    this.description = description;
    this.notes = notes;
    this.start_at = start_at;
    this.finish_at = finish_at;
    this.customer = customer && new Customer(customer);
    this.professional = professional && new Professional(professional);
    this.payment = payment && new Payment(payment);
  }
}
