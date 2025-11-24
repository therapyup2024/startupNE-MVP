import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ProfessionalAgreement,
  Professional as ProfessionalEntity,
} from '../entities/typeorm/professional.entity';
import { In, Repository } from 'typeorm';
import { Professional } from './entities/professional.entity';
import { ProfessionalList } from '../professional/entities/professional_list.entity';
import { SecurityUtil } from '../utils/security.util';
import { UidUtil } from '../utils/uid.util';
import { Agreement } from '../entities/typeorm/agreement.entity';
import { StatusService } from '../status/status.service';
import { randomUUID } from 'crypto';
import { ValidateEmailProfessionalDto } from './dto/validate-email-professional.dto';
import { ProfessionalPending } from './entities/professional_pending.entity';
import { ServiceErrorHandler } from '../decorators/service-error-handler.decorator';
import { Role } from '../auth/roles.decorator';

@Injectable()
export class ProfessionalService {
  constructor(
    @InjectRepository(ProfessionalEntity)
    private professionalRepository: Repository<ProfessionalEntity>,
    @InjectRepository(Agreement)
    private agreementRepository: Repository<Agreement>,
    @InjectRepository(ProfessionalAgreement)
    private professionalAgreementRepository: Repository<ProfessionalAgreement>,
    private securityUtil: SecurityUtil,
    private uidUtil: UidUtil,
    private statusService: StatusService,
  ) {}

  @ServiceErrorHandler
  async create(
    createProfessionalDto: CreateProfessionalDto,
  ): Promise<ProfessionalPending> {
    const password_hash = await this.securityUtil.hash(
      createProfessionalDto.password,
    );

    const uid = this.uidUtil.generateUid();

    const professional: ProfessionalEntity = {
      ...createProfessionalDto,
      password_hash,
      uid,
      status: 'pending_verification',
    };

    await this.professionalRepository.save(professional);
    const message = await this.statusService.sendStatusValidation({
      ...(professional as any),
      type: Role.Professional,
    });

    if (createProfessionalDto.agreement_ids) {
      const agreements = await this.agreementRepository.find({
        where: { id: In(createProfessionalDto.agreement_ids) },
      });
      for (const agreement of agreements) {
        const uid = randomUUID();
        await this.professionalAgreementRepository.save({
          uid,
          agreement,
          professional,
        });
      }
    }

    return { email: professional.email as string, message: message || '' };
  }

  @ServiceErrorHandler
  async validateEmail(
    validateEmailProfessionalDto: ValidateEmailProfessionalDto,
  ): Promise<void> {
    const professional = await this.professionalRepository.findOneByOrFail({
      email: validateEmailProfessionalDto.email,
      status: 'pending_verification',
    });

    const code = this.statusService.createActivationCode(professional as any);
    if (code != validateEmailProfessionalDto.code)
      throw new BadRequestException('Dados inválidos');

    await this.professionalRepository.update(
      { uid: professional.uid },
      {
        status: 'active',
      },
    );
  }

  @ServiceErrorHandler
  async findAll(): Promise<ProfessionalList> {
    const professionals = await this.professionalRepository.find({
      where: { status: 'active' },
    });
    return {
      data: professionals.map((element) => new Professional(element)),
    };
  }

  @ServiceErrorHandler
  async findOne(uid: string): Promise<Professional> {
    const professional = await this.professionalRepository.findOneOrFail({
      where: { uid },
    });
    return new Professional(professional);
  }

  @ServiceErrorHandler
  async update(
    uid: string,
    updateProfessionalDto: UpdateProfessionalDto,
  ): Promise<void> {
    const professional = {
      ...updateProfessionalDto,
      status: undefined,
      password_hash: undefined,
      uid: undefined,
      agreements: undefined as Agreement[] | undefined,
      agreement_ids: undefined,
    };

    if (updateProfessionalDto.agreement_ids) {
      const agreements = await this.agreementRepository.find({
        where: { id: In(updateProfessionalDto.agreement_ids) },
      });
      for (const agreement of agreements) {
        const professionalAgreementUid = randomUUID();
        await this.professionalAgreementRepository.save({
          uid: professionalAgreementUid,
          agreement,
          professional: { ...professional, uid },
        });
      }
    }

    await this.professionalRepository.update({ uid }, professional);
  }

  @ServiceErrorHandler
  async remove(uid: string): Promise<void> {
    await this.professionalRepository.update({ uid }, { status: 'inactive' });
  }
}
