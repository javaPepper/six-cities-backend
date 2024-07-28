import { config } from 'dotenv';
import { Logger } from '../logger/logger.interface.js';
import { Config } from './config.interface.js';
import { appSchema, Schema } from './schema.js';
import { inject, injectable } from 'inversify';
import { Component } from '../types/component.enum.js';


@injectable()
export class AppConfig implements Config<Schema> {
  private readonly config: Schema;

  constructor(
		@inject(Component.Logger) private readonly logger: Logger
  ) {
    const parsedOutput = config();

    if(parsedOutput.error) {
      throw new Error('Faled to read .env file. Be sure the file to be existed');
    }

    appSchema.load({});
    appSchema.validate({allowed: 'strict', output: this.logger.info});

    this.config = appSchema.getProperties();
    this.logger.info('The .env file was successfully parsed');
  }

  get<T extends keyof Schema>(key: T): Schema[T] {
    return this.config[key];
  }
}
