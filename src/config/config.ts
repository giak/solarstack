import { registerAs } from '@nestjs/config';
import {
  ConfigAppInterface,
  ConfigDbInterface,
  ConfigJWTInterface,
  ConfigEncryptionInterface,
} from './config.interface';

export enum ConfigKey {
  App = 'APP',
  Db = 'DB',
  Jwt = 'JWT',
  Encryption = 'ENCRYPTION',
}

export enum Environment {
  Local = 'local',
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
  Testing = 'testing',
}

const APPConfig = registerAs(
  ConfigKey.App,
  (): ConfigAppInterface => ({
    env: Environment[process.env.NODE_ENV as keyof typeof Environment] || Environment.Development,
    port: Number(process.env.APP_PORT),
    appName: process.env.APP_NAME,
  }),
);

export const DBConfig = registerAs(
  ConfigKey.Db,
  (): ConfigDbInterface => ({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    dialect: process.env.DATABASE_DIALECT,
    charset: process.env.DATABASE_CHARSET,
    logging: process.env.DATABASE_LOGGING === 'true',
  }),
);

const JWTConfig = registerAs(
  ConfigKey.Jwt,
  (): ConfigJWTInterface => ({
    secret: process.env.JWT_SECRET,
    expireIn: process.env.JWT_EXPIRES_IN,
  }),
);

const EncryptionConfig = registerAs(
  ConfigKey.Encryption,
  (): ConfigEncryptionInterface => ({
    token: process.env.ENCRYPTION_TOKEN,
  }),
);

export const configurations = [APPConfig, DBConfig, JWTConfig, EncryptionConfig];
