import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from '../entities/typeorm/product.entity';
import { Professional } from '../entities/typeorm/professional.entity';
import { Customer } from '../entities/typeorm/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Professional, Customer])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
