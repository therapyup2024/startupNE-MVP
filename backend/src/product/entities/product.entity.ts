import { ApiProperty } from '@nestjs/swagger';
import { Product as ProductTypeorm } from '../../entities/typeorm/product.entity';
import { Professional } from '../../professional/entities/professional.entity';
import { Payment } from '../../payment/entities/payment.entity';

export class Product
  implements
    Omit<
      ProductTypeorm,
      'link_url' | 'amount' | 'status' | 'professional' | 'payments'
    >
{
  @ApiProperty()
  id?: number;

  @ApiProperty()
  professional?: Professional;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  type?: string;

  @ApiProperty()
  value?: number;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  created_at?: Date;

  @ApiProperty()
  updated_at?: Date;

  @ApiProperty()
  payments?: Payment[] | undefined;

  constructor({
    id,
    professional,
    name,
    type,
    value,
    description,
    created_at,
    updated_at,
    payments,
  }: ProductTypeorm) {
    this.id = id;
    this.professional = professional && new Professional(professional);
    this.name = name;
    this.type = type;
    this.value = value;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.payments = payments?.map((payment) => new Payment(payment));
  }
}
