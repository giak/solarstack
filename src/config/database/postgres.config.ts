import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DBConfig, ORMConfig } from '../config';

dotenvConfig({ path: `src/config/env/${process.env.NODE_ENV}.env` });

/* for ROOT app.module.ts */
const config = {
  type: DBConfig().dialect,
  host: DBConfig().host,
  port: DBConfig().port,
  charset: DBConfig().charset,
  username: DBConfig().username,
  password: DBConfig().password,
  database: DBConfig().database,
  keepConnectionAlive: true,
  entities: [ORMConfig().entities],
  migrations: [ORMConfig().migrations],
  cli: {
    migrationsDir: ORMConfig().migrationsDir,
  },
  autoLoadEntities: true,
  migrationsRun: false,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  logging: DBConfig().logging === true ? 'all' : false,
  logger: DBConfig().logging === true ? 'file' : 'advanced-console',
};

export default registerAs(
  'dbConfiguration',
  (): PostgresConnectionOptions => config as PostgresConnectionOptions,
);
