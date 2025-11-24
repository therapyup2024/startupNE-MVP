import { UserType } from '../user.type';

export interface TokenPayloadDto {
  sub: string;
  username: string;
  type: UserType;
}
