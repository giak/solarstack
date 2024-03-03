export interface ConfigAppInterface {
  env: string;
  port: number;
  appName: string;
}
export interface ConfigSessionInterface {
  secret: string;
  salt: string;
  name: string;
  resave: boolean;
  saveUninitialized: boolean;
  cookie: ConfigSessionCookieInterface;
}
interface ConfigSessionCookieInterface {
  httpOnly: boolean;
  secure: boolean;
  maxAge: number;
}

export interface ConfigDbInterface {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  dialect: string;
  charset: string;
  logging: boolean;
}

export interface ConfigOrmInterface {
  entities: string;
  migrations: string;
  migrationsDir: string;
}

export interface ConfigJWTInterface {
  secret: string;
  expireIn: string;
}

export interface ConfigEncryptionInterface {
  token: string;
}
