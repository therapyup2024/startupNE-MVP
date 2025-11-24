import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfessionalModule } from './professional/professional.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import {
  Professional,
  ProfessionalAgreement,
} from './entities/typeorm/professional.entity';
import { Agreement } from './entities/typeorm/agreement.entity';
import {
  Customer,
  CustomerAgreement,
} from './entities/typeorm/customer.entity';
import { AccessPlan } from './entities/typeorm/access_plan.entity';
import { Appointment } from './entities/typeorm/appointment.entity';
import { ChatMessage } from './entities/typeorm/chat_message.entity';
import { Chat } from './entities/typeorm/chat.entity';
import { Module as ModuleEntity } from './entities/typeorm/module.entity';
import { Payment } from './entities/typeorm/payment.entity';
import { UserModule } from './entities/typeorm/user_module.entity';
import { UserRole } from './entities/typeorm/user_role.entity';
import { User } from './entities/typeorm/user.entity';
import { ProfessionalAccessPlan } from './entities/typeorm/professional_access_plan.entity';
import { AccessPlanModule } from './entities/typeorm/access_plan_module.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import { AgreementModule } from './agreement/agreement.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ChatMessageModule } from './chat-message/chat-message.module';
import { ImageUploadModule } from './image-upload/image-upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { Product } from './entities/typeorm/product.entity';
import { ProductModule } from './product/product.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        fallthrough: false,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Professional,
        Customer,
        Agreement,
        CustomerAgreement,
        ProfessionalAgreement,
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
      synchronize: false,
    }),
    ProfessionalModule,
    AuthModule,
    CustomerModule,
    AgreementModule,
    AppointmentModule,
    ChatMessageModule,
    ImageUploadModule,
    ProductModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
