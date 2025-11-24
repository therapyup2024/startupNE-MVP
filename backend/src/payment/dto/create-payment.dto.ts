import { ApiProperty } from '@nestjs/swagger';
import { Payment } from '../../entities/typeorm/payment.entity';

export class CreatePaymentDto
  implements
    Omit<
      Payment,
      | 'payer'
      | 'receiver'
      | 'product'
      | 'id'
      | 'type'
      | 'provider'
      | 'link_url'
      | 'status'
    >
{
  product_id: number;
  payer_uid: string;
  receiver_uid: string;

  @ApiProperty({
    example: 6000,
    description: 'Value in cents (ex. 100 = 1,00)',
  })
  value?: number;

  @ApiProperty({ example: 'Pagamento de Consulta com dr. Antônio' })
  description?: string;
}
