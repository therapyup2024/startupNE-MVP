import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Professional } from './professional.entity';
import { AccessPlan } from './access_plan.entity';

@Entity('professional_access_plans')
export class ProfessionalAccessPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Professional, (prof) => prof.accessPlans)
  professional: Professional;

  @ManyToOne(() => AccessPlan, (plan) => plan.subscriptions)
  accessPlan: AccessPlan;

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
