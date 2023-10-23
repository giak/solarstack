import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configurations } from './config';
import { validateConfig } from './config-validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `src/config/env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [...configurations],
      validate: validateConfig,
    }),
  ],
})
export class ConfigsModule {}
