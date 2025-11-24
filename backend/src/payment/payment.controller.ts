import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Logger,
  Request,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { Role, Roles } from '../auth/roles.decorator';
import { PaymentList } from './entities/payment_list.entity';
import { Payment } from './entities/payment.entity';
import { TokenPayloadDto } from '../auth/dtos/token_payload.dto';
import { UserIdType } from '../appointment/appointment.service';
import { UserType } from '../auth/user.type';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  private getCurrentUserIdData(req: { user: TokenPayloadDto }): UserIdType {
    const curretUser = req.user;
    const userIdData: UserIdType = {};
    if (UserType.Professional === curretUser.type)
      userIdData.professional_uid = curretUser.sub;
    if (UserType.Customer === curretUser.type)
      userIdData.customer_uid = curretUser.sub;

    return userIdData;
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @Roles(Role.Professional, Role.Customer)
  @ApiResponse({ status: 200, type: PaymentList })
  findAll(@Request() req) {
    const userIdData = this.getCurrentUserIdData(req);
    return this.paymentService.findAll(userIdData);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @Roles(Role.Professional, Role.Customer)
  @ApiResponse({ status: 200, type: Payment })
  findOne(@Request() req, @Param('id') id: string) {
    const userIdData = this.getCurrentUserIdData(req);
    return this.paymentService.findOne(+id, userIdData);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: any) {
    Logger.error(updatePaymentDto);
    return this.paymentService.update(+id, updatePaymentDto);
  }
}
