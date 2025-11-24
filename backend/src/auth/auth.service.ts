import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Professional } from '../entities/typeorm/professional.entity';
import { Repository } from 'typeorm';
import { SecurityUtil } from '../utils/security.util';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenPayloadDto } from './dtos/token_payload.dto';
import { TokenReturnDto } from './dtos/token_return.dto';
import { UserType } from './user.type';
import { Customer } from '../entities/typeorm/customer.entity';
import { ServiceErrorHandler } from '../decorators/service-error-handler.decorator';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Professional)
    private professionalRepository: Repository<Professional>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private securityUtil: SecurityUtil,
    private jwtService: JwtService,
  ) {}

  @ServiceErrorHandler
  async signIn(
    username: string,
    pass: string,
    type: UserType,
  ): Promise<TokenReturnDto> {
    if (UserType.Professional !== type && UserType.Customer !== type)
      throw new BadRequestException(
        'use "professional" or "customer" for type',
      );

    const payload: TokenPayloadDto = {
      sub: '',
      username: '',
      type,
    };

    if (UserType.Professional === type) {
      await this.handleProfessionalSignIn(username, pass, payload);
    }

    if (UserType.Customer === type) {
      await this.handleCustomerSignIn(username, pass, payload);
    }

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  private async handleProfessionalSignIn(
    username: string,
    password: string,
    payload: TokenPayloadDto,
  ) {
    const professional = await this.professionalRepository.findOneOrFail({
      where: { email: username },
    });
    if (
      !(await this.securityUtil.compare(
        password,
        professional.password_hash as string,
      ))
    ) {
      throw new UnauthorizedException();
    }

    this.validateUser(professional);

    payload.sub = professional.uid as string;
    payload.username = professional.email as string;
  }

  private async handleCustomerSignIn(
    username: string,
    password: string,
    payload: TokenPayloadDto,
  ) {
    const customer = await this.customerRepository.findOneOrFail({
      where: { email: username },
    });
    if (
      !(await this.securityUtil.compare(
        password,
        customer.password_hash as string,
      ))
    ) {
      throw new UnauthorizedException();
    }

    this.validateUser(customer);

    payload.sub = customer.uid as string;
    payload.username = customer.email as string;
  }

  private validateUser({ status }: { status?: string }) {
    if (!status)
      throw new InternalServerErrorException('Erro ao recuperar usuário');

    /** 'pending_verification' | 'active' | 'inactive' | 'banned' */
    if ('pending_verification' === status)
      throw new BadRequestException('Usuário pendente de ativação');

    if ('inactive' === status || 'banned' === status)
      throw new BadRequestException('Usuário não permitido');
  }
}
