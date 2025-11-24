import { ApiProperty } from '@nestjs/swagger';
import { Product } from './product.entity';

export class ProductList {
  @ApiProperty({ type: [Product] })
  data: Product[];
}
