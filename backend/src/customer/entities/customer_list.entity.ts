import { ApiProperty } from '@nestjs/swagger';
import { Customer } from './customer.entity';

export class CustomerList {
  @ApiProperty({ type: [Customer] })
  data: Customer[];
}
