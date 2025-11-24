import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CustomerAgreement } from './customer.entity';
import { ProfessionalAgreement } from './professional.entity';

@Entity('agreements')
export class Agreement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  text: string;

  @Column({ nullable: true })
  type: string;

  @Column({
    type: 'enum',
    enum: ['inactive', 'active'],
    default: 'inactive',
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

  @OneToMany(
    () => ProfessionalAgreement,
    (professionalAgreement) => professionalAgreement.professional,
  )
  professionalAgreements?: ProfessionalAgreement[];
}
