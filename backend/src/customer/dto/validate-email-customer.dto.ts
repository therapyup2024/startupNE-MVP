import { ApiProperty } from '@nestjs/swagger';

export class ValidateEmailCustomerDto {
  @ApiProperty({ example: '123' })
  code: string;

  @ApiProperty({ example: 'usuario@email.com' })
  email: string;
}
