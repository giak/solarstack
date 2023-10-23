export interface ConfigAppInterface {
  env: string;
  port: number;
  appName: string;
}

export interface ConfigDbInterface {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface ConfigJWTInterface {
  secret: string;
  expireIn: string;
}

export interface ConfigEncryptionInterface {
  token: string;
}
