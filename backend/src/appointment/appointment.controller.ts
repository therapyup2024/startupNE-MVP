import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { AppointmentService, UserIdType } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { Role, Roles } from '../auth/roles.decorator';
import { TokenPayloadDto } from '../auth/dtos/token_payload.dto';
import { UserType } from '../auth/user.type';
import { Appointment } from './entities/appointment.entity';
import { AppointmentList } from './entities/appointment_list.entity';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  private getCurrentUserIdData(req: { user: TokenPayloadDto }): UserIdType {
    const curretUser = req.user;
    const userIdData: UserIdType = {};
    if (UserType.Professional === curretUser.type)
      userIdData.professional_uid = curretUser.sub;
    if (UserType.Customer === curretUser.type)
      userIdData.customer_uid = curretUser.sub;

    return userIdData;
  }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @Roles(Role.Professional, Role.Customer)
  @ApiResponse({ status: 201, description: 'Created response' })
  create(@Request() req, @Body() createAppointmentDto: CreateAppointmentDto) {
    const userIdData = this.getCurrentUserIdData(req);
    return this.appointmentService.create({
      ...createAppointmentDto,
      ...userIdData,
    });
  }

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @Roles(Role.Professional, Role.Customer)
  @ApiResponse({ status: 200, type: AppointmentList })
  findAll(@Request() req) {
    return this.appointmentService.findAll(this.getCurrentUserIdData(req));
  }

  @Get(':uid')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @Roles(Role.Professional, Role.Customer)
  @ApiResponse({ status: 200, type: Appointment })
  findOne(@Request() req, @Param('uid') uid: string) {
    return this.appointmentService.findOne(uid, this.getCurrentUserIdData(req));
  }

  @Patch(':uid')
  @HttpCode(204)
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @Roles(Role.Professional, Role.Customer)
  @ApiResponse({ status: 204, description: 'No content response' })
  update(
    @Request() req,
    @Param('uid') uid: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(
      uid,
      this.getCurrentUserIdData(req),
      updateAppointmentDto,
    );
  }

  @Delete(':uid')
  @HttpCode(204)
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @Roles(Role.Professional, Role.Customer)
  @ApiResponse({ status: 204, description: 'No content response' })
  remove(@Request() req, @Param('uid') uid: string) {
    return this.appointmentService.remove(uid, this.getCurrentUserIdData(req));
  }
}
