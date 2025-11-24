import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Chat } from './chat.entity';

@Entity('chat_messages')
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  @JoinColumn({
    name: 'chat_id',
    referencedColumnName: 'id',
  })
  chat: Chat;

  @Column()
  sender_uid: string;

  @Column('text', { nullable: true })
  content: string;

  @Column({
    type: 'enum',
    enum: ['sent', 'delivered', 'read', 'deleted'],
    default: 'sent',
  })
  status: string;

  @CreateDateColumn()
  created_at: Date;
}
