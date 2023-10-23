import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port = configService.get('APP_PORT');
  await app.listen(port);

  Logger.log(`Server running on ${await app.getUrl()}`, 'Bootstrap');
}
bootstrap();
