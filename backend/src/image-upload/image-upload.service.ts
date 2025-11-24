import { Injectable } from '@nestjs/common';
import { ServiceErrorHandler } from '../decorators/service-error-handler.decorator';
import { ImageUpload } from './entities/image-upload.entity';
import { Repository } from 'typeorm';
import { Customer } from '../entities/typeorm/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Professional } from '../entities/typeorm/professional.entity';
import { UserIdType } from '../appointment/appointment.service';

@Injectable()
export class ImageUploadService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Professional)
    private professionalRepository: Repository<Professional>,
  ) {}

  @ServiceErrorHandler
  async handleAvatarUpload(
    file: Express.Multer.File,
    { customer_uid, professional_uid }: UserIdType,
  ): Promise<ImageUpload> {
    if (customer_uid)
      await this.customerRepository.update(
        { uid: customer_uid },
        { avatar_url: file.filename },
      );
    else
      await this.professionalRepository.update(
        { uid: professional_uid },
        { avatar_url: file.filename },
      );

    return Promise.resolve({
      message: 'Image uploaded successfully',
      filePath: file.filename,
    });
  }
}
