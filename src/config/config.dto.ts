import { IsAlpha, IsDefined, IsEnum, IsNumberString, IsString, MinLength } from 'class-validator';
import { Environment } from './config';

export class EnvironmentVariablesDTO {
  /* APP CONFIG */
  @IsDefined()
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsDefined()
  @IsNumberString()
  @MinLength(1)
  APP_PORT: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  APP_NAME: string;

  /* DATA CONFIG */
  @IsDefined()
  @IsNumberString()
  @MinLength(1)
  DATABASE_PORT: number | string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  DATABASE_HOST: string;

  @IsDefined()
  @IsAlpha()
  @MinLength(1)
  DATABASE_USERNAME: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  DATABASE_PASSWORD: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  DATABASE: string;

  /* ORM */
  @IsDefined()
  TYPEORM_ENTITIES: string[];

  @IsDefined()
  TYPEORM_MIGRATIONS: string[];

  @IsDefined()
  @IsString()
  TYPEORM_MIGRATIONS_DIR: string;

  /* JWT CONFIG */
  @IsDefined()
  @IsString()
  @MinLength(18)
  JWT_SECRET: string;

  @IsDefined()
  @IsString()
  @MinLength(2)
  JWT_EXPIRES_IN: string;

  /* ENCRYPTION CONFIG */
  @IsDefined()
  @IsString()
  @MinLength(1)
  ENCRYPTION_TOKEN: string;
}
