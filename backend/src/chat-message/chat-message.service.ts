import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { UpdateChatMessageDto } from './dto/update-chat-message.dto';
import { Professional } from '../entities/typeorm/professional.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Customer } from '../entities/typeorm/customer.entity';
import { ChatMessage as ChatMessageEntity } from '../entities/typeorm/chat_message.entity';
import { Chat } from '../entities/typeorm/chat.entity';
import { ChatMessageList } from './entities/chat-message_list.entity';
import { ChatMessage } from './entities/chat-message.entity';
import { UserIdType } from '../appointment/appointment.service';
import { ServiceErrorHandler } from '../decorators/service-error-handler.decorator';

@Injectable()
export class ChatMessageService {
  constructor(
    @InjectRepository(Professional)
    private professionalRepository: Repository<Professional>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    @InjectRepository(ChatMessageEntity)
    private chatMessageRepository: Repository<ChatMessageEntity>,
  ) {}

  @ServiceErrorHandler
  async getProfessionalOrCustomer({
    customer_uid,
    professional_uid,
  }: UserIdType): Promise<Professional | Customer | null> {
    if (customer_uid)
      return await this.customerRepository.findOneBy({ uid: customer_uid });

    return await this.professionalRepository.findOneBy({
      uid: professional_uid,
    });
  }

  @ServiceErrorHandler
  async create(
    createChatMessageDto: CreateChatMessageDto,
    sender: Professional | Customer,
    receiver_uid: string,
  ): Promise<void> {
    let professional: Professional | undefined;
    let customer: Customer | undefined;
    if (sender instanceof Professional) {
      customer = await this.customerRepository.findOneByOrFail({
        uid: receiver_uid,
      });
      professional = sender;
    }
    if (sender instanceof Customer) {
      professional = await this.professionalRepository.findOneByOrFail({
        uid: receiver_uid,
      });
      customer = sender;
    }
    if (!professional || !customer) throw new BadRequestException();

    const chat = await this.getChatForProfessionalAndCustomer(
      professional,
      customer,
    );

    await this.chatMessageRepository.save({
      chat: chat,
      content: createChatMessageDto.content,
      sender_uid: sender.uid,
      status: 'sent',
    });
  }

  private async getChatForProfessionalAndCustomer(
    professional: Professional,
    customer: Customer,
  ): Promise<Chat> {
    const existingChat = await this.chatRepository.findOneBy({
      professional,
      customer,
    });
    if (existingChat) return existingChat;

    const newChat = new Chat();
    newChat.professional = professional;
    newChat.customer = customer;
    newChat.status = 'active';
    return await this.chatRepository.save(newChat);
  }

  private async getChatForProfessionalAndCustomerOnlyIfExistis(
    receiver_uid: string,
    sender: Professional | Customer,
  ): Promise<Chat> {
    let professional: Professional | undefined;
    let customer: Customer | undefined;
    if (sender instanceof Professional) {
      customer = await this.customerRepository.findOneByOrFail({
        uid: receiver_uid,
      });
      professional = sender;
    }
    if (sender instanceof Customer) {
      professional = await this.professionalRepository.findOneByOrFail({
        uid: receiver_uid,
      });
      customer = sender;
    }
    if (!professional || !customer) throw new BadRequestException();

    return await this.chatRepository.findOneByOrFail({
      professional,
      customer,
    });
  }

  @ServiceErrorHandler
  async findAll(
    sender: Professional | Customer,
    receiver_uid: string,
  ): Promise<ChatMessageList> {
    const chat = await this.getChatForProfessionalAndCustomerOnlyIfExistis(
      receiver_uid,
      sender,
    );

    const messages = await this.chatMessageRepository.findBy({
      chat,
      status: Not('deleted'),
    });
    return {
      data: messages.map((elm) => new ChatMessage(elm)),
    };
  }

  @ServiceErrorHandler
  async update(
    id: number,
    sender: Professional | Customer,
    receiver_uid: string,
    updateChatMessageDto: UpdateChatMessageDto,
  ): Promise<void> {
    const chat = await this.getChatForProfessionalAndCustomerOnlyIfExistis(
      receiver_uid,
      sender,
    );

    await this.chatMessageRepository.update(
      { id, chat },
      { ...updateChatMessageDto, id: undefined },
    );
  }

  @ServiceErrorHandler
  async remove(
    id: number,
    sender: Professional | Customer,
    receiver_uid: string,
  ): Promise<void> {
    const chat = await this.getChatForProfessionalAndCustomerOnlyIfExistis(
      receiver_uid,
      sender,
    );

    await this.chatMessageRepository.update(
      { id, chat },
      { status: 'deleted' },
    );
  }
}
