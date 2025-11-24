import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalController } from './professional.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Professional,
  ProfessionalAgreement,
} from '../entities/typeorm/professional.entity';
import { SecurityUtil } from '../utils/security.util';
import { UidUtil } from '../utils/uid.util';
import { Agreement } from '../entities/typeorm/agreement.entity';
import { StatusService } from '../status/status.service';
import { NotifyUtil } from '../utils/notify.util';
import { Customer } from '../entities/typeorm/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Professional,
      Agreement,
      ProfessionalAgreement,
      Customer,
    ]),
  ],
  controllers: [ProfessionalController],
  providers: [
    ProfessionalService,
    SecurityUtil,
    UidUtil,
    StatusService,
    NotifyUtil,
  ],
})
export class ProfessionalModule {}
