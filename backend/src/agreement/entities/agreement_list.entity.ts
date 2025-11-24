import { ApiProperty } from '@nestjs/swagger';
import { Agreement } from './agreement.entity';

export class AgreementList {
  @ApiProperty({ type: [Agreement] })
  data: Agreement[];
}
