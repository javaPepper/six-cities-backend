import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type Schema = {
	PORT: number,
	SALT: string,
	DB_HOST: string
}

export const appSchema = convict<Schema>({
  PORT: {
    env: 'PORT',
    default: 9999,
    format: 'port'
  },
  SALT: {
    env: 'SALT',
    format: String,
    default: ''
  },
  DB_HOST: {
    env: 'DB_HOST',
    format: 'ipaddress',
    default:'127.0.0.1'
  }
});
