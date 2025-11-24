import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Professional } from './professional.entity';
import { Payment } from './payment.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryColumn('char', { length: 36 })
  uid?: string;

  @ManyToOne(() => Customer, (customer) => customer.appointments)
  @JoinColumn({
    name: 'customer_uid',
    referencedColumnName: 'uid',
  })
  customer?: Customer;

  @ManyToOne(() => Professional, (professional) => professional.appointments)
  @JoinColumn({
    name: 'professional_uid',
    referencedColumnName: 'uid',
  })
  professional?: Professional;

  @OneToOne(() => Payment, (payment) => payment.appointment)
  @JoinColumn({
    name: 'payment_id',
    referencedColumnName: 'id',
  })
  payment?: Payment;

  @Column({ nullable: true })
  title?: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('text', { nullable: true })
  notes?: string;

  @Column()
  start_at?: Date;

  @Column()
  finish_at?: Date;

  @Column({
    type: 'enum',
    enum: ['pending', 'scheduled', 'rescheduled', 'cancelled', 'completed'],
    default: 'pending',
  })
  status?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
