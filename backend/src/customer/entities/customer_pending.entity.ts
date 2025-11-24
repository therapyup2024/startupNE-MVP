import { ApiProperty } from '@nestjs/swagger';

export class CustomerPending {
  @ApiProperty()
  message: string;

  @ApiProperty()
  email: string;
}
