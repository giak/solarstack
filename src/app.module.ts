import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigsModule } from './config/config.module';
import { DataSource } from 'typeorm';
import databaseConfig from './config/database';
import { ConfigService } from '@nestjs/config';

const typeOrmConfig = {
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
  ],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => configService.get('databaseConfig'),
  dataSourceFactory: async (options) => new DataSource(options).initialize(),
};

@Module({
  imports: [ConfigsModule, TypeOrmModule.forRootAsync(typeOrmConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
