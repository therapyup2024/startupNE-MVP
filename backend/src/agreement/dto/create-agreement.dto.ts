import { ApiProperty } from '@nestjs/swagger';

export class CreateAgreementDto {
  @ApiProperty({ example: 'Meu documento de acordos' })
  name: string;

  @ApiProperty({ example: '<h1>Meu documento de acordos</h1>' })
  text: string;

  @ApiProperty({ example: 'política' })
  type: string;
}
