import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigSessionInterface } from './config/config.interface';
import { ConfigKey } from './config/config';
import fastifySecureSession from '@fastify/secure-session';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  const configService: ConfigService = app.get<ConfigService>(ConfigService);

  const sessionConfig = configService.get<ConfigSessionInterface>(ConfigKey.Session);
  await app.register(fastifySecureSession, sessionConfig);

  const port = configService.get('APP_PORT');
  await app.listen(port);

  /* TODO : to remove or add a conditional environnement */
  Logger.log(`Server running on ${await app.getUrl()}`, 'Bootstrap');
}
bootstrap();
