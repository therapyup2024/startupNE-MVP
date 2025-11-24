import { ApiProperty } from '@nestjs/swagger';
import { ChatMessage } from './chat-message.entity';

export class ChatMessageList {
  @ApiProperty({ type: [ChatMessage] })
  data: ChatMessage[];
}
