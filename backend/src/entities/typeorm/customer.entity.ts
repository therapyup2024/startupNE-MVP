import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Agreement } from './agreement.entity';
import { Appointment } from './appointment.entity';
import { Chat } from './chat.entity';
import { Payment } from './payment.entity';

@Entity('customers')
export class Customer {
  @PrimaryColumn('char', { length: 36 })
  uid?: string;

  @Column()
  name?: string;

  @Column({ unique: true })
  email?: string;

  @Column()
  password_hash?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  avatar_url?: string;

  @Column({ type: 'enum', enum: ['male', 'female', 'other'], default: 'other' })
  gender?: string;

  @Column({ nullable: true })
  document?: string;

  @Column({ default: false })
  is_foreigner?: boolean;

  @Column({
    type: 'enum',
    enum: ['pending_verification', 'active', 'inactive', 'banned'],
    default: 'pending_verification',
  })
  status?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany(
    () => CustomerAgreement,
    (customerAgreement) => customerAgreement.customer,
  )
  customerAgreements?: CustomerAgreement[];

  @OneToMany(() => Appointment, (appointment) => appointment.customer)
  appointments?: Appointment[];

  @OneToMany(() => Chat, (chat) => chat.customer)
  chats?: Chat[];

  @OneToMany(() => Payment, (payment) => payment.payer)
  payments?: Payment[];
}

@Entity('customer_agreements')
export class CustomerAgreement {
  @PrimaryColumn('char', { length: 36 })
  uid: string;

  @CreateDateColumn()
  accepted_at?: Date;

  @OneToOne(() => Agreement)
  @JoinColumn({
    name: 'agreement_id',
    referencedColumnName: 'id',
  })
  agreement?: Agreement;

  @OneToOne(() => Customer)
  @JoinColumn({
    name: 'customer_uid',
    referencedColumnName: 'uid',
  })
  customer?: Customer;
}
