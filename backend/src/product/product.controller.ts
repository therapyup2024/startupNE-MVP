import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { Role, Roles } from '../auth/roles.decorator';
import { ProductList } from './entities/product_list.entity';
import { Product } from './entities/product.entity';
import { TokenPayloadDto } from '../auth/dtos/token_payload.dto';
import { UserIdType } from '../appointment/appointment.service';
import { UserType } from '../auth/user.type';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  private getCurrentUserIdData(req: { user: TokenPayloadDto }): UserIdType {
    const curretUser = req.user;
    const userIdData: UserIdType = {};
    if (UserType.Professional === curretUser.type)
      userIdData.professional_uid = curretUser.sub;
    if (UserType.Customer === curretUser.type)
      userIdData.customer_uid = curretUser.sub;

    return userIdData;
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @Roles(Role.Professional)
  @ApiResponse({ status: 201 })
  create(@Request() req, @Body() createProductDto: CreateProductDto) {
    const userIdData = this.getCurrentUserIdData(req);
    return this.productService.create({ ...createProductDto, ...userIdData });
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @Roles(Role.Professional, Role.Customer)
  @ApiResponse({ status: 200, type: ProductList })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @Roles(Role.Professional, Role.Customer)
  @ApiResponse({ status: 200, type: Product })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @Roles(Role.Professional)
  @ApiResponse({ status: 204 })
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const userIdData = this.getCurrentUserIdData(req);
    return this.productService.update(+id, userIdData, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @Roles(Role.Professional)
  @ApiResponse({ status: 204 })
  remove(@Request() req, @Param('id') id: string) {
    const userIdData = this.getCurrentUserIdData(req);
    return this.productService.remove(+id, userIdData);
  }
}
