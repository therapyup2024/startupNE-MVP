import { Injectable } from '@nestjs/common';
import { CreateAgreementDto } from './dto/create-agreement.dto';
import { UpdateAgreementDto } from './dto/update-agreement.dto';
import { Agreement as AgreementTypeorm } from '../entities/typeorm/agreement.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AgreementList } from './entities/agreement_list.entity';
import { Agreement } from './entities/agreement.entity';
import { ServiceErrorHandler } from '../decorators/service-error-handler.decorator';

@Injectable()
export class AgreementService {
  constructor(
    @InjectRepository(AgreementTypeorm)
    private agreementRepository: Repository<AgreementTypeorm>,
  ) {}

  @ServiceErrorHandler
  async create(createAgreementDto: CreateAgreementDto): Promise<void> {
    await this.agreementRepository.save(createAgreementDto);
  }

  @ServiceErrorHandler
  async findAll(): Promise<AgreementList> {
    const result = await this.agreementRepository.find({
      where: { status: 'active' },
    });
    return { data: result.map((agreement) => new Agreement(agreement)) };
  }

  @ServiceErrorHandler
  async findOne(id: number): Promise<Agreement> {
    const agreement = await this.agreementRepository.findOneByOrFail({ id });
    return new Agreement(agreement);
  }

  @ServiceErrorHandler
  async update(
    id: number,
    updateAgreementDto: UpdateAgreementDto,
  ): Promise<void> {
    await this.agreementRepository.update({ id }, updateAgreementDto);
  }

  @ServiceErrorHandler
  async remove(id: number): Promise<void> {
    await this.agreementRepository.update({ id }, { status: 'inactive' });
  }
}
