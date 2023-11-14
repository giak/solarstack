import { registerAs } from '@nestjs/config';
import {
  ConfigAppInterface,
  ConfigDbInterface,
  ConfigOrmInterface,
  ConfigJWTInterface,
  ConfigEncryptionInterface,
  ConfigSessionInterface,
} from './config.interface';

export enum ConfigKey {
  App = 'APP',
  Session = 'SESSION',
  Db = 'DB',
  Orm = 'ORM',
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

export const SessionConfig = registerAs(
  ConfigKey.Session,
  (): ConfigSessionInterface => ({
    secret: process.env.SESSION_SECRET,
    name: process.env.SESSION_NAME,
    resave: process.env.SESSION_RESAVE === 'true',
    saveUninitialized: process.env.SESSION_SAVE_UNINITIALIZED === 'true',
    cookie: {
      httpOnly: process.env.SESSION_COOKIE_HTTP_ONLY === 'true',
      secure: process.env.SESSION_COOKIE_SECURE === 'false',
      maxAge: Number(process.env.SESSION_COOKIE_MAX_AGE),
    },
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

export const ORMConfig = registerAs(
  ConfigKey.Orm,
  (): ConfigOrmInterface => ({
    entities: process.env.TYPEORM_ENTITIES,
    migrations: process.env.TYPEORM_MIGRATIONS,
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
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

export const configurations = [APPConfig, SessionConfig, JWTConfig, EncryptionConfig];
