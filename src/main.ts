import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port = configService.get('APP_PORT');
  await app.listen(port);

  /* TODO : to remove or add a conditional environnement */
  Logger.log(`Server running on ${await app.getUrl()}`, 'Bootstrap');
}
bootstrap();
