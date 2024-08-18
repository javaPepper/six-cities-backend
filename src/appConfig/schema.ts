import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type Schema = {
  SALT: string,
  DB_USER: string,
  DB_PASSWORD: string,
}

export const appSchema = convict<Schema>({
  SALT: {
    env: 'SALT',
    format: String,
    default: ''
  },
  DB_USER: {
    env: 'DB_USER',
    format: String,
    default: null
  },
  DB_PASSWORD: {
    env: 'DB_PASSWORD',
    format: String,
    default: null
  }
});
