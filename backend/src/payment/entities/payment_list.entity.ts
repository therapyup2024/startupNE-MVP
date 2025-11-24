import { ApiProperty } from '@nestjs/swagger';
import { Payment } from './payment.entity';

export class PaymentList {
  @ApiProperty({ type: [Payment] })
  data: Payment[];
}
