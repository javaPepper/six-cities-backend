import { inject, injectable } from 'inversify';
import { Config } from '../appConfig/config.interface.js';
import { Schema } from '../appConfig/schema.js';
import { Logger } from '../logger/logger.interface.js';
import { Component } from '../types/component.enum.js';

@injectable()
export class Application {
  constructor(
		@inject(Component.Logger) private readonly logger: Logger,
		@inject(Component.Config) private readonly config: Config<Schema>
  ){}

  public async init() {
    this.logger.info('Application initialized');
    this.logger.info(`Got value from .env file. PORT:${this.config.get('PORT')}`);
  }
}
