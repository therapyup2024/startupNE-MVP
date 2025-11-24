import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Role, ROLES_KEY } from './roles.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Professional } from '../entities/typeorm/professional.entity';
import { Repository } from 'typeorm';
import { Customer } from '../entities/typeorm/customer.entity';
import { TokenPayloadDto } from './dtos/token_payload.dto';
import { UserType } from './user.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    @InjectRepository(Professional)
    private professionalRepository: Repository<Professional>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    if (!request) throw new UnauthorizedException();

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    const requiredRoles = this.reflector.getAllAndOverride<(UserType & Role)[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const payload = await this.jwtService.verifyAsync<TokenPayloadDto>(
        token,
        {
          secret: process.env.JWT_SECRET,
        },
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
      request['user'] = payload;

      if (!requiredRoles) return true;

      if (payload.type === UserType.Professional)
        return await this.validateProfessional(request, payload, requiredRoles);

      if (payload.type === UserType.Customer)
        return await this.validateCustomer(request, payload, requiredRoles);
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private async validateProfessional(
    request: Request,
    payload: TokenPayloadDto,
    requiredRoles: never[],
  ): Promise<boolean> {
    const professional = await this.professionalRepository.findOneOrFail({
      where: { email: payload.username },
    });

    if (
      requiredRoles.some((role) => Role.Self === role) &&
      professional.uid === this.extractUIdFromRequest(request)
    )
      return true;

    if (requiredRoles.some((role) => Role.Professional === role)) return true;

    return false;
  }

  private async validateCustomer(
    request: Request,
    payload: TokenPayloadDto,
    requiredRoles: never[],
  ): Promise<boolean> {
    const customer = await this.customerRepository.findOneOrFail({
      where: { email: payload.username },
    });

    if (
      requiredRoles.some((role) => Role.Self === role) &&
      customer.uid === this.extractUIdFromRequest(request)
    )
      return true;

    if (requiredRoles.some((role) => Role.Customer === role)) return true;

    return false;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractUIdFromRequest(request: Request): string | undefined {
    return request.params.uid;
  }
}
