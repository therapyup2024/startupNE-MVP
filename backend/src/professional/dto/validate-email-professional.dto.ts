import { ApiProperty } from '@nestjs/swagger';

export class ValidateEmailProfessionalDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  email: string;
}
