import { ApiProperty } from '@nestjs/swagger';
import { Professional } from '../../entities/typeorm/professional.entity';
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export class CreateProfessionalDto
  implements
    Omit<
      Professional,
      | 'uid'
      | 'password_hash'
      | 'status'
      | 'created_at'
      | 'updated_at'
      | 'agreements'
      | 'appointments'
      | 'chats'
      | 'payments'
      | 'accessPlans'
      | 'avatar_url'
    >
{
  /* eslint-disable */
  @ApiProperty({ example: 'Antonio Alves' })
  name: string;

  @ApiProperty({ example: 'usuario@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678' })
  password: string;

  @ApiProperty({
    nullable: true,
    example: '+5589999999999',
    description: 'número com o código do país (ex. +55)',
  })
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({ example: 'male', examples: ['male', 'female', 'other'] })
  gender: string;

  @ApiProperty({ nullable: true, example: '954.577.860-13' })
  @IsOptional()
  @IsNumber()
  document?: string;

  @ApiProperty({ example: '01/12345' })
  license_number: string;

  @ApiProperty({
    example: 'psychiatrist',
    examples: ['psychiatrist', 'psychologist', 'therapist'],
  })
  specialty: string;

  @ApiProperty({ example: 'Minha abordagem' })
  approach: string;

  @ApiProperty({
    nullable: true,
    example: 'Meu nome é Antonio Alves. Atuo na área a mais de 20 anos.',
  })
  description?: string;

  @ApiProperty({ example: [1, 2] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  agreement_ids: string[];
}
