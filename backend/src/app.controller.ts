import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

class HealthcheckDto {
  @ApiProperty()
  status: string;

  @ApiProperty()
  message: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiResponse({ status: 200, type: HealthcheckDto })
  getHealthcheck(): HealthcheckDto {
    return this.appService.getHealthcheck();
  }
}
