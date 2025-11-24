import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Customer,
  CustomerAgreement,
} from '../entities/typeorm/customer.entity';
import { Agreement } from '../entities/typeorm/agreement.entity';
import { SecurityUtil } from '../utils/security.util';
import { UidUtil } from '../utils/uid.util';
import { StatusService } from '../status/status.service';
import { NotifyUtil } from '../utils/notify.util';
import { Professional } from '../entities/typeorm/professional.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Customer,
      Agreement,
      CustomerAgreement,
      Professional,
    ]),
  ],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    SecurityUtil,
    UidUtil,
    StatusService,
    NotifyUtil,
  ],
})
export class CustomerModule {}
