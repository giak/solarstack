import { config as dotenvConfig } from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import postgresMasterConfig from './postgres.config';

dotenvConfig({ path: `src/config/env/${process.env.NODE_ENV}.env` });

/* For TypeOrm migrations */
ConfigModule.forRoot({
  isGlobal: true,
  load: [postgresMasterConfig],
  envFilePath: `src/config/env/${process.env.NODE_ENV}.env`,
});

const connectionSource = new DataSource(postgresMasterConfig() as DataSourceOptions);
export default connectionSource;
