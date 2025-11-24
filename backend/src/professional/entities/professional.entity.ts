import { ApiProperty } from '@nestjs/swagger';
import { Professional as ProfessionalTypeorm } from '../../entities/typeorm/professional.entity';
import { generateUploadsUrl } from '../../utils/uploads-url.util';

export class Professional
  implements
    Omit<
      ProfessionalTypeorm,
      | 'password_hash'
      | 'agreements'
      | 'appointments'
      | 'chats'
      | 'payments'
      | 'accessPlans'
    >
{
  @ApiProperty()
  uid?: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  avatar_url?: string;

  @ApiProperty()
  gender?: string;

  @ApiProperty()
  document?: string;

  @ApiProperty()
  license_number?: string;

  @ApiProperty()
  specialty?: string;

  @ApiProperty()
  approach?: string;

  @ApiProperty()
  description?: string;

  constructor({
    uid,
    name,
    email,
    phone,
    avatar_url,
    gender,
    document,
    license_number,
    specialty,
    approach,
    description,
  }: ProfessionalTypeorm) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.gender = gender;
    this.document = document;
    this.license_number = license_number;
    this.specialty = specialty;
    this.approach = approach;
    this.description = description;
    this.avatar_url = generateUploadsUrl(avatar_url);
  }
}
