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
import { ProfessionalService } from './professional.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { Professional } from './entities/professional.entity';
import { ProfessionalList } from './entities/professional_list.entity';
import { ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role, Roles } from '../auth/roles.decorator';
import { ValidateEmailProfessionalDto } from './dto/validate-email-professional.dto';
import { ProfessionalPending } from './entities/professional_pending.entity';

@Controller('professional')
export class ProfessionalController {
  constructor(private readonly professionalService: ProfessionalService) {}

  @Post()
  @HttpCode(202)
  @ApiResponse({ status: 202, type: ProfessionalPending })
  create(
    @Body() createProfessionalDto: CreateProfessionalDto,
  ): Promise<ProfessionalPending> {
    return this.professionalService.create(createProfessionalDto);
  }

  @Post('validate')
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'No content response' })
  validate(
    @Body() validateEmailProfessionalDto: ValidateEmailProfessionalDto,
  ): Promise<void> {
    return this.professionalService.validateEmail(validateEmailProfessionalDto);
  }

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @ApiResponse({ status: 200, type: ProfessionalList })
  findAll(): Promise<ProfessionalList> {
    return this.professionalService.findAll();
  }

  @Get('profile')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @Roles(Role.Professional)
  @ApiResponse({ status: 200, type: Professional })
  profile(@Request() req: any): Promise<Professional> {
    if (!req.user?.sub) throw new UnauthorizedException();
    return this.professionalService.findOne(req.user.sub);
  }

  @Get(':uid')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @Roles(Role.Self, Role.Customer)
  @ApiResponse({ status: 200, type: Professional })
  findOne(@Param('uid') uid: string): Promise<Professional> {
    return this.professionalService.findOne(uid);
  }

  @Patch(':uid')
  @HttpCode(204)
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @Roles(Role.Self)
  @ApiResponse({ status: 204, description: 'No content response' })
  update(
    @Param('uid') uid: string,
    @Body() updateProfessionalDto: UpdateProfessionalDto,
  ): Promise<void> {
    return this.professionalService.update(uid, updateProfessionalDto);
  }

  @Delete(':uid')
  @HttpCode(204)
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @Roles(Role.Self)
  @ApiResponse({ status: 204, description: 'No content response' })
  remove(@Param('uid') uid: string): Promise<void> {
    return this.professionalService.remove(uid);
  }
}
