import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { AccessPlan } from './access_plan.entity';
import { Module } from './module.entity';

@Entity('accessplan_modules')
export class AccessPlanModule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AccessPlan, (plan) => plan.subscriptions)
  accessPlan: AccessPlan;

  @ManyToOne(() => Module, (prof) => prof.accessPlans)
  module: Module;

  @Column({ type: 'datetime', nullable: true })
  expires_at: Date;

  @Column({
    type: 'enum',
    enum: ['active', 'expired', 'cancelled'],
    default: 'active',
  })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
