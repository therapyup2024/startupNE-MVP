import { Module } from '@nestjs/common';
import { ImageUploadService } from './image-upload.service';
import { ImageUploadController } from './image-upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professional } from '../entities/typeorm/professional.entity';
import { Customer } from '../entities/typeorm/customer.entity';
import { join } from 'node:path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Professional, Customer]),
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '..', '..', 'uploads'),
        filename: (req: any, file, cb) => {
          const array_original_name = file.originalname.split('.');
          const extension = array_original_name[array_original_name.length - 1];
          //eslint-disable-next-line
          const current_user_uid = req?.user?.sub || Date.now().toString();
          const filename = `${current_user_uid}.${extension}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [ImageUploadController],
  providers: [ImageUploadService],
})
export class ImageUploadModule {}
