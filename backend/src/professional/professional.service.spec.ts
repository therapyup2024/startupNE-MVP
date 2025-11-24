import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalService } from './professional.service';

describe('ProfessionalService', () => {
  let service: ProfessionalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfessionalService],
    }).compile();

    service = module.get<ProfessionalService>(ProfessionalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call hash method correctly', () => {
      service.create({ password: 'any_password' } as any);
    });
  });
});
