import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../entities/customer.entity';
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export class CreateCustomerDto
  implements
    Omit<
      Customer,
      | 'uid'
      | 'password_hash'
      | 'agreements'
      | 'appointments'
      | 'chats'
      | 'payments'
      | 'avatar_url'
    >
{
  @ApiProperty({ example: 'Antonio da Silva' })
  name: string;

  @ApiProperty({ example: 'usuario@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678' })
  password: string;

  @ApiProperty({
    example: '+5589999999999',
    description: 'número com o código do país (ex. +55)',
  })
  @IsOptional()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: 'male', examples: ['male', 'female', 'other'] })
  gender: string;

  @ApiProperty({ example: '954.577.860-13' })
  document: string;

  @ApiProperty({ example: false, examples: [true, false] })
  is_foreigner: boolean;

  @ApiProperty({ example: [1, 2] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  agreement_ids: string[];
}
