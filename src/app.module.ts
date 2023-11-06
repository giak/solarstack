import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigsModule } from './config/config.module';
import dbConfiguration from './config/database/postgres.config';
import { UsersModule } from './users/users.module';

const typeOrmConfig = {
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfiguration],
    }),
  ],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => configService.get('dbConfiguration'),
  dataSourceFactory: async (options) => new DataSource(options).initialize(),
};

@Module({
  imports: [ConfigsModule, TypeOrmModule.forRootAsync(typeOrmConfig), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
