import { ApiProperty } from '@nestjs/swagger';

export class ImageUpload {
  @ApiProperty()
  message: string;

  @ApiProperty()
  filePath: string;
}
