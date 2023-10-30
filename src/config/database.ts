import path from 'path';
import { registerAs } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DBConfig } from './config';

export default registerAs(
  'databaseConfig',
  (): PostgresConnectionOptions =>
    ({
      logging: false,
      entities: [path.resolve(`${__dirname}/../../**/**.entity{.ts,.js}`)],
      migrations: [path.resolve(`${__dirname}/../../../database/migrations/*{.ts,.js}`)],
      migrationsRun: true,
      migrationsTableName: 'migrations',
      keepConnectionAlive: true,
      synchronize: false,
      type: DBConfig().dialect,
      host: DBConfig().host,
      port: DBConfig().port,
      username: DBConfig().username,
      password: DBConfig().password,
      database: DBConfig().database,
      charset: DBConfig().charset,
      logger: DBConfig().logging === true ? 'debug' : 'advanced-console',
    }) as PostgresConnectionOptions,
);
