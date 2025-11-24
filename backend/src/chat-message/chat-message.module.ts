import { Module } from '@nestjs/common';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageController } from './chat-message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professional } from '../entities/typeorm/professional.entity';
import { Customer } from '../entities/typeorm/customer.entity';
import { Chat } from '../entities/typeorm/chat.entity';
import { ChatMessage } from '../entities/typeorm/chat_message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, ChatMessage, Professional, Customer]),
  ],
  controllers: [ChatMessageController],
  providers: [ChatMessageService],
})
export class ChatMessageModule {}
