import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Professional } from './professional.entity';
import { Payment } from './payment.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Professional, (professional) => professional.products, {
    nullable: true,
  })
  @JoinColumn({
    name: 'professional_uid',
    referencedColumnName: 'uid',
  })
  professional?: Professional;

  @Column({ nullable: false })
  name?: string;

  @Column({ nullable: false, default: 'appointment' })
  type?: string;

  @Column({ nullable: false })
  value?: number; // Product value

  @Column()
  amount?: number; // Product  stock quantity

  @Column({ nullable: true })
  link_url?: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive'],
    default: 'active',
  })
  status?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany(() => Payment, (payment) => payment.product)
  @JoinTable()
  payments?: Payment[];
}
