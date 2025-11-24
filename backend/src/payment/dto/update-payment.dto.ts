import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePaymentDto } from './create-payment.dto';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @ApiProperty({ enum: ['credit', 'debit', 'pix'], example: 'credit' })
  type: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ enum: ['pending', 'paid', 'refunded', 'failed'] })
  status: string;
}
