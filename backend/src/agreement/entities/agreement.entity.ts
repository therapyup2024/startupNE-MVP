import { ApiProperty } from '@nestjs/swagger';
import { Agreement as AgreementTypeorm } from '../../entities/typeorm/agreement.entity';

export class Agreement
  implements Omit<AgreementTypeorm, 'customers' | 'professionals'>
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  type: string;

  constructor({ id, name, text, type }: AgreementTypeorm) {
    this.id = id;
    this.name = name;
    this.text = text;
    this.type = type;
  }
}
