import {
  Controller,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ImageUploadService } from './image-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUpload } from './entities/image-upload.entity';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBody, ApiConsumes, ApiSecurity } from '@nestjs/swagger';
import { Role, Roles } from '../auth/roles.decorator';
import { ImageUploadDto } from './dto/image-upload.dto';
import { TokenPayloadDto } from '../auth/dtos/token_payload.dto';
import { UserIdType } from '../appointment/appointment.service';
import { UserType } from '../auth/user.type';

@Controller('image-upload')
export class ImageUploadController {
  constructor(private readonly imageUploadService: ImageUploadService) {}

  private getCurrentUserIdData(req: { user: TokenPayloadDto }): UserIdType {
    const curretUser = req.user;
    const userIdData: UserIdType = {};
    if (UserType.Professional === curretUser.type)
      userIdData.professional_uid = curretUser.sub;
    if (UserType.Customer === curretUser.type)
      userIdData.customer_uid = curretUser.sub;

    return userIdData;
  }

  @Post('avatar')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: ImageUploadDto,
    description: 'Image file to upload',
  })
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  @Roles(Role.Professional, Role.Customer)
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ImageUpload> {
    return this.imageUploadService.handleAvatarUpload(
      file,
      this.getCurrentUserIdData(req),
    );
  }
}
