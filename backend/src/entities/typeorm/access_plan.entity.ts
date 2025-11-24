import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Module } from './module.entity';
import { ProfessionalAccessPlan } from './professional_access_plan.entity';

@Entity('access_plans')
export class AccessPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: ['active', 'inactive'], default: 'active' })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ProfessionalAccessPlan, (pap) => pap.accessPlan)
  subscriptions: ProfessionalAccessPlan[];

  @ManyToMany(() => Module, (module) => module.accessPlans)
  @JoinTable({
    name: 'accessplan_modules',
    joinColumn: { name: 'access_plan_id' },
    inverseJoinColumn: { name: 'module_id' },
  })
  modules: Module[];
}
