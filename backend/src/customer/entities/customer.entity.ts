import { ApiProperty } from '@nestjs/swagger';
import { Customer as CustomerTypeorm } from '../../entities/typeorm/customer.entity';
import { generateUploadsUrl } from '../../utils/uploads-url.util';

export class Customer
  implements
    Omit<
      CustomerTypeorm,
      'password_hash' | 'agreements' | 'appointments' | 'chats' | 'payments'
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
  is_foreigner?: boolean;

  constructor({
    uid,
    name,
    email,
    phone,
    avatar_url,
    gender,
    document,
    is_foreigner,
  }: CustomerTypeorm) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.gender = gender;
    this.document = document;
    this.is_foreigner = is_foreigner;
    this.avatar_url = generateUploadsUrl(avatar_url);
  }
}
