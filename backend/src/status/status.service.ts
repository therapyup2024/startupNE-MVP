import { Injectable } from '@nestjs/common';
import { Professional } from '../entities/typeorm/professional.entity';
import { NotifyUtil } from '../utils/notify.util';

@Injectable()
export class StatusService {
  constructor(private notifyUtil: NotifyUtil) {}

  async sendStatusValidation(entity: {
    status?: string;
    email: string;
    uid: string;
    type: string;
  }): Promise<string | void> /** message */ {
    if ('pending_verification' === entity.status)
      return this.notifyUtil.sendActivationCode(
        entity.type,
        { email: entity.email },
        this.createActivationCode(entity),
      );
  }

  setActiveStatus(entity: Professional): string /** message */ {
    entity.status = 'active';
    return 'Usuário ativo';
  }

  public createActivationCode(entity: { uid: string }): string {
    return entity.uid.slice(entity.uid.length - 4, entity.uid.length - 1);
  }
}
