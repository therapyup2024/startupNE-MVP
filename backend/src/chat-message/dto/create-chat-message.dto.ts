import { ApiProperty } from '@nestjs/swagger';
import { ChatMessage } from '../../entities/typeorm/chat_message.entity';

export class CreateChatMessageDto
  implements
    Omit<ChatMessage, 'id' | 'chat' | 'status' | 'sender_uid' | 'created_at'>
{
  @ApiProperty({ example: 'Olá, vamos agenda a consulta.' })
  content: string;
}
