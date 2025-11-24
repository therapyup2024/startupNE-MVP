import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../entities/typeorm/product.entity';

export class CreateProductDto
  implements
    Omit<
      Product,
      | 'id'
      | 'professional'
      | 'type'
      | 'link_url'
      | 'amount'
      | 'status'
      | 'created_at'
      | 'updated_at'
    >
{
  @ApiProperty({ example: 'Consulta com o dr. Antônio' })
  name: string;

  @ApiProperty({
    example: 6000,
    description: 'Value in cents (ex. 100 = 1,00)',
  })
  value: number;

  @ApiProperty({ example: 'Consulta inicial.' })
  description: string;

  professional_uid?: string;
}
