import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '../user.type';

export class SignInDto {
  @ApiProperty({ example: 'usuario@email.com' })
  username: string;

  @ApiProperty({ example: '12345678' })
  password: string;

  @ApiProperty({
    enum: UserType,
    example: UserType.Professional,
    examples: [UserType.Professional, UserType.Customer],
  })
  type: UserType;
}
