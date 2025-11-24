import { ApiProperty } from '@nestjs/swagger';
import { Professional } from './professional.entity';

export class ProfessionalList {
  @ApiProperty({ type: [Professional] })
  data: Professional[];
}
