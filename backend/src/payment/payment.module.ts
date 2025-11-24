import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../entities/typeorm/payment.entity';
import { Professional } from '../entities/typeorm/professional.entity';
import { Customer } from '../entities/typeorm/customer.entity';
import { Product } from '../entities/typeorm/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Product, Professional, Customer]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
