import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerList } from './entities/customer_list.entity';
import { ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { Customer } from './entities/customer.entity';
import { CustomerPending } from './entities/customer_pending.entity';
import { ValidateEmailCustomerDto } from './dto/validate-email-customer.dto';
import { Role, Roles } from '../auth/roles.decorator';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @HttpCode(202)
  @ApiResponse({ status: 202, type: CustomerPending })
  create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerPending> {
    return this.customerService.create(createCustomerDto);
  }

  @Post('validate')
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'No content response' })
  validate(
    @Body() validateEmailCustomerDto: ValidateEmailCustomerDto,
  ): Promise<void> {
    return this.customerService.validateEmail(validateEmailCustomerDto);
  }

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @ApiResponse({ status: 200, type: CustomerList })
  findAll(): Promise<CustomerList> {
    return this.customerService.findAll();
  }

  @Get('profile')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @Roles(Role.Customer)
  @ApiResponse({ status: 200, type: Customer })
  profile(@Request() req: any): Promise<Customer> {
    if (!req.user?.sub) throw new UnauthorizedException();

    return this.customerService.findOne(req.user.sub);
  }

  @Get(':uid')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @ApiResponse({ status: 200, type: Customer })
  findOne(@Param('uid') uid: string): Promise<Customer> {
    return this.customerService.findOne(uid);
  }

  @Patch(':uid')
  @HttpCode(204)
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @ApiResponse({ status: 204, description: 'No content response' })
  update(
    @Param('uid') uid: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<void> {
    return this.customerService.update(uid, updateCustomerDto);
  }

  @Delete(':uid')
  @HttpCode(204)
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @ApiResponse({ status: 204, description: 'No content response' })
  remove(@Param('uid') uid: string): Promise<void> {
    return this.customerService.remove(uid);
  }
}
