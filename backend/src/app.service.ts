import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealthcheck(): { status: string; message: string } {
    return {
      status: 'healthy',
      message: 'Service is operational',
    };
  }
}
