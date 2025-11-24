import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professional } from '../entities/typeorm/professional.entity';
import { SecurityUtil } from 'src/utils/security.util';
import { ConfigModule } from '@nestjs/config';
import { Customer } from '../entities/typeorm/customer.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION as undefined },
    }),
    TypeOrmModule.forFeature([Professional, Customer]),
  ],
  controllers: [AuthController],
  providers: [AuthService, SecurityUtil],
})
export class AuthModule {}
