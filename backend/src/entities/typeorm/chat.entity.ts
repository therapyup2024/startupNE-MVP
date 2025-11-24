import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Professional } from './professional.entity';
import { ChatMessage } from './chat_message.entity';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.chats)
  @JoinColumn({
    name: 'customer_uid',
    referencedColumnName: 'uid',
  })
  customer: Customer;

  @ManyToOne(() => Professional, (professional) => professional.chats)
  @JoinColumn({
    name: 'professional_uid',
    referencedColumnName: 'uid',
  })
  professional: Professional;

  @Column({
    type: 'enum',
    enum: ['active', 'archived', 'deleted'],
    default: 'active',
  })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ChatMessage, (msg) => msg.chat)
  messages: ChatMessage[];
}
