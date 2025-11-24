import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Agreement } from './agreement.entity';
import { Appointment } from './appointment.entity';
import { Chat } from './chat.entity';
import { Payment } from './payment.entity';
import { ProfessionalAccessPlan } from './professional_access_plan.entity';
import { Product } from './product.entity';

@Entity('professionals')
export class Professional {
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

  @Column({ nullable: true })
  license_number?: string;

  @Column({ nullable: true })
  specialty?: string;

  @Column({ nullable: true })
  approach?: string;

  @Column('text', { nullable: true })
  description?: string;

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
    () => ProfessionalAgreement,
    (professionalAgreement) => professionalAgreement.professional,
  )
  professionalAgreements?: ProfessionalAgreement[];

  @OneToMany(() => Appointment, (appointment) => appointment.professional)
  @JoinTable()
  appointments?: Appointment[];

  @OneToMany(() => Chat, (chat) => chat.professional)
  @JoinTable()
  chats?: Chat[];

  @OneToMany(() => Product, (product) => product.professional)
  @JoinTable()
  products?: Product[];

  @OneToMany(() => Payment, (payment) => payment.receiver)
  @JoinTable()
  payments?: Payment[];

  @OneToMany(() => ProfessionalAccessPlan, (pap) => pap.professional)
  accessPlans?: ProfessionalAccessPlan[];
}

@Entity('professional_agreements')
export class ProfessionalAgreement {
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

  @OneToOne(() => Professional)
  @JoinColumn({
    name: 'professional_uid',
    referencedColumnName: 'uid',
  })
  professional?: Professional;
}
