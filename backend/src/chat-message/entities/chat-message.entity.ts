import { ApiProperty } from '@nestjs/swagger';
import { ChatMessage as ChatMessageEntity } from '../../entities/typeorm/chat_message.entity';

export class ChatMessage {
  @ApiProperty()
  chat_id?: string;

  @ApiProperty()
  sender_uid: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  created_at: Date;

  constructor({ sender_uid, content, created_at }: ChatMessageEntity) {
    this.sender_uid = sender_uid;
    this.content = content;
    this.created_at = created_at;
  }
}
