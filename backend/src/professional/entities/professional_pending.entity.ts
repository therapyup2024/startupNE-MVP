import { ApiProperty } from '@nestjs/swagger';

export class ProfessionalPending {
  @ApiProperty()
  message: string;

  @ApiProperty()
  email: string;
}
