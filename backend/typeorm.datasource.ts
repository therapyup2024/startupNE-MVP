import { DataSource } from 'typeorm';
import {
  Professional,
  ProfessionalAgreement,
} from './src/entities/typeorm/professional.entity';
import { Agreement } from './src/entities/typeorm/agreement.entity';
import {
  Customer,
  CustomerAgreement,
} from './src/entities/typeorm/customer.entity';
import { AccessPlan } from './src/entities/typeorm/access_plan.entity';
import { Appointment } from './src/entities/typeorm/appointment.entity';
import { ChatMessage } from './src/entities/typeorm/chat_message.entity';
import { Chat } from './src/entities/typeorm/chat.entity';
import { Module as ModuleEntity } from './src/entities/typeorm/module.entity';
import { Payment } from './src/entities/typeorm/payment.entity';
import { UserModule } from './src/entities/typeorm/user_module.entity';
import { UserRole } from './src/entities/typeorm/user_role.entity';
import { User } from './src/entities/typeorm/user.entity';
import { ProfessionalAccessPlan } from './src/entities/typeorm/professional_access_plan.entity';
import { AccessPlanModule } from './src/entities/typeorm/access_plan_module.entity';
import { ConfigModule } from '@nestjs/config';
import { Product } from './src/entities/typeorm/product.entity';

export default (async () => {
  await ConfigModule.forRoot();
  return new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DEFAULT_NAME,
    entities: [
      Professional,
      Customer,
      Agreement,
      ProfessionalAgreement,
      CustomerAgreement,
      ProfessionalAccessPlan,
      AccessPlan,
      Appointment,
      ChatMessage,
      Chat,
      ModuleEntity,
      Payment,
      AccessPlanModule,
      UserModule,
      UserRole,
      User,
      Product,
    ],
    migrations: ['./db/typeorm/*'],
    synchronize: false,
  });
})();
