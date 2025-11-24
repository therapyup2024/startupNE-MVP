import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../../customer/entities/customer.entity';
import { Payment as PaymentTypeorm } from '../../entities/typeorm/payment.entity';
import { Product } from '../../product/entities/product.entity';
import { Professional } from '../../professional/entities/professional.entity';

export class Payment
  implements Omit<PaymentTypeorm, 'payer' | 'receiver' | 'product'>
{
  @ApiProperty()
  id?: number;

  @ApiProperty()
  payer?: Customer;

  @ApiProperty()
  receiver?: Professional;

  @ApiProperty()
  product?: Product;

  @ApiProperty()
  type?: string;

  @ApiProperty()
  provider?: string;

  @ApiProperty()
  link_url?: string;

  @ApiProperty()
  value?: number;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  status?: string;

  @ApiProperty()
  created_at?: Date;

  @ApiProperty()
  updated_at?: Date;

  constructor({
    id,
    payer,
    receiver,
    product,
    type,
    provider,
    link_url,
    value,
    description,
    status,
    created_at,
    updated_at,
  }: PaymentTypeorm) {
    this.id = id;
    this.payer = payer && new Customer(payer);
    this.receiver = receiver && new Professional(receiver);
    this.product = product && new Product(product);
    this.type = type;
    this.provider = provider;
    this.link_url = link_url;
    this.value = value;
    this.description = description;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
