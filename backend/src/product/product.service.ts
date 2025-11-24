import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ServiceErrorHandler } from '../decorators/service-error-handler.decorator';
import { Product as ProductEntity } from '../entities/typeorm/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserIdType } from '../appointment/appointment.service';
import { Product } from './entities/product.entity';
import { ProductList } from './entities/product_list.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  private handleUserIdType({ customer_uid, professional_uid }: UserIdType): {
    customer?: any;
    professional?: any;
  } {
    const criteria: { customer?: any; professional?: any } = {};
    if (customer_uid) criteria.customer = { uid: customer_uid };
    if (professional_uid) criteria.professional = { uid: professional_uid };
    return criteria;
  }

  @ServiceErrorHandler
  async create(createProductDto: CreateProductDto): Promise<void> {
    await this.productRepository.save({
      ...createProductDto,
      type: 'appointment',
      professional: { uid: createProductDto.professional_uid },
    } as ProductEntity);
  }

  @ServiceErrorHandler
  async findAll(): Promise<ProductList> {
    let result: ProductEntity[] = [];

    result = await this.productRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.professional', 'professionals')
      .getMany();

    return { data: result.map((product) => new Product(product)) };
  }

  @ServiceErrorHandler
  async findOne(id: number): Promise<Product> {
    const result = await this.productRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.professional', 'professionals')
      .leftJoinAndSelect('products.payments', 'payments')
      .where({
        id,
      })
      .getOneOrFail();

    return new Product(result);
  }

  @ServiceErrorHandler
  async update(
    id: number,
    userIdType: UserIdType,
    updateProductDto: UpdateProductDto,
  ): Promise<void> {
    await this.productRepository.update(
      {
        id,
        ...this.handleUserIdType(userIdType),
      },
      {
        ...updateProductDto,
      } as ProductEntity,
    );
  }

  @ServiceErrorHandler
  async remove(id: number, userIdType: UserIdType): Promise<void> {
    await this.productRepository.update(
      {
        id,
        ...this.handleUserIdType(userIdType),
      },
      {
        status: 'inactive',
      } as ProductEntity,
    );
  }
}
