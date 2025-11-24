import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Professional } from './professional.entity';
import { Product } from './product.entity';
import { Appointment } from './appointment.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Customer, (customer) => customer.payments, {
    nullable: true,
  })
  @JoinColumn({
    name: 'payer_uid',
    referencedColumnName: 'uid',
  })
  payer?: Customer;

  @ManyToOne(() => Professional, (professional) => professional.payments, {
    nullable: true,
  })
  @JoinColumn({
    name: 'receiver_uid',
    referencedColumnName: 'uid',
  })
  receiver?: Professional;

  @ManyToOne(() => Product, (product) => product.payments, {
    nullable: true,
  })
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
  })
  product?: Product;

  @OneToOne(() => Appointment, (appointment) => appointment.payment)
  appointment?: Appointment;

  @Column({ type: 'enum', enum: ['credit', 'debit', 'pix'] })
  type?: string;

  @Column({ nullable: true })
  provider?: string;

  @Column({ nullable: true })
  link_url?: string;

  @Column({ nullable: false })
  value?: number; // Payment value

  @Column('text', { nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'paid', 'refunded', 'failed'],
    default: 'pending',
  })
  status?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
