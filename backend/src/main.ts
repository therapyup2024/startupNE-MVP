import { initalizeTracing } from './utils/monitor.util';
initalizeTracing();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  ConfigModule.forRoot();

  const config = new DocumentBuilder()
    .setTitle('Therapy Platform')
    .addServer(process?.env?.API_HOST || '127.0.0.1:3000', 'Remote server')
    .setDescription("Therapy Platform backend's api specification")
    .setVersion('1.0')
    .addTag('therapy')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
