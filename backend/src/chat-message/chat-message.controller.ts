import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { ChatMessageService } from './chat-message.service';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { UpdateChatMessageDto } from './dto/update-chat-message.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { TokenPayloadDto } from '../auth/dtos/token_payload.dto';
import { UserIdType } from '../appointment/appointment.service';
import { UserType } from '../auth/user.type';
import { ChatMessageList } from './entities/chat-message_list.entity';
import { Role, Roles } from '../auth/roles.decorator';

@Controller('chat-message')
export class ChatMessageController {
  constructor(private readonly chatMessageService: ChatMessageService) {}

  private getCurrentUserIdData(req: { user: TokenPayloadDto }): UserIdType {
    const curretUser = req.user;
    const userIdData: UserIdType = {};
    if (UserType.Professional === curretUser.type)
      userIdData.professional_uid = curretUser.sub;
    if (UserType.Customer === curretUser.type)
      userIdData.customer_uid = curretUser.sub;

    return userIdData;
  }

  @Post(':receiver_uid')
  @HttpCode(201)
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @Roles(Role.Professional, Role.Customer)
  @ApiResponse({ status: 201, description: 'Created' })
  async create(
    @Request() req,
    @Param('receiver_uid') receiver_uid: string,
    @Body() createChatMessageDto: CreateChatMessageDto,
  ): Promise<void> {
    const sender = await this.chatMessageService.getProfessionalOrCustomer(
      this.getCurrentUserIdData(req),
    );
    if (!sender) throw new ForbiddenException('Invalid User');
    return this.chatMessageService.create(
      createChatMessageDto,
      sender,
      receiver_uid,
    );
  }

  @Get(':receiver_uid')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @Roles(Role.Professional, Role.Customer)
  @ApiResponse({ status: 200, type: ChatMessageList })
  async findAll(
    @Request() req,
    @Param('receiver_uid') receiver_uid: string,
  ): Promise<ChatMessageList> {
    const sender = await this.chatMessageService.getProfessionalOrCustomer(
      this.getCurrentUserIdData(req),
    );
    if (!sender) throw new ForbiddenException('Invalid User');
    return this.chatMessageService.findAll(sender, receiver_uid);
  }

  @Patch(':receiver_uid/message/:id')
  @HttpCode(204)
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @Roles(Role.Professional, Role.Customer)
  @ApiResponse({ status: 204, description: 'No content' })
  async update(
    @Request() req,
    @Param('id') id: string,
    @Param('receiver_uid') receiver_uid: string,
    @Body() updateChatMessageDto: UpdateChatMessageDto,
  ): Promise<void> {
    const sender = await this.chatMessageService.getProfessionalOrCustomer(
      this.getCurrentUserIdData(req),
    );
    if (!sender) throw new ForbiddenException('Invalid User');
    return this.chatMessageService.update(
      +id,
      sender,
      receiver_uid,
      updateChatMessageDto,
    );
  }

  @Delete(':receiver_uid/message/:id')
  @HttpCode(204)
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @Roles(Role.Professional, Role.Customer)
  @ApiResponse({ status: 204, description: 'No content' })
  async remove(
    @Request() req,
    @Param('id') id: string,
    @Param('receiver_uid') receiver_uid: string,
  ): Promise<void> {
    const sender = await this.chatMessageService.getProfessionalOrCustomer(
      this.getCurrentUserIdData(req),
    );
    if (!sender) throw new ForbiddenException('Invalid User');
    return this.chatMessageService.remove(+id, sender, receiver_uid);
  }
}
