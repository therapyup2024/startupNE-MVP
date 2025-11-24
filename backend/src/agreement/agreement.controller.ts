import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { AgreementService } from './agreement.service';
import { CreateAgreementDto } from './dto/create-agreement.dto';
import { UpdateAgreementDto } from './dto/update-agreement.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Agreement } from './entities/agreement.entity';
import { AgreementList } from './entities/agreement_list.entity';

@Controller('agreement')
export class AgreementController {
  constructor(private readonly agreementService: AgreementService) {}

  @Post()
  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'Created response' })
  create(@Body() createAgreementDto: CreateAgreementDto) {
    return this.agreementService.create(createAgreementDto);
  }

  @Get()
  @HttpCode(200)
  @ApiResponse({ status: 200, type: AgreementList })
  findAll() {
    return this.agreementService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiResponse({ status: 200, type: Agreement })
  findOne(@Param('id') id: string) {
    return this.agreementService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'No content response' })
  update(
    @Param('id') id: string,
    @Body() updateAgreementDto: UpdateAgreementDto,
  ) {
    return this.agreementService.update(+id, updateAgreementDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'No content response' })
  remove(@Param('id') id: string) {
    return this.agreementService.remove(+id);
  }
}
