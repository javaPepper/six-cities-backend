import { inject, injectable } from 'inversify';
import { Config } from '../appConfig/config.interface.js';
import { Schema } from '../appConfig/schema.js';
import { Logger } from '../logger/logger.interface.js';
import { Component } from '../types/components.enum.js';
import { Database } from '../database/database.interface.js';
import { setMongoDBUri } from '../utils/databaseUri.js';

@injectable()
export class Application {
  constructor(
		@inject(Component.Logger) private readonly logger: Logger,
		@inject(Component.Config) private readonly config: Config<Schema>,
    @inject(Component.MongoDatabase) private readonly database: Database
  ){}

  private async connectDb(){
    const mongoDbUri = setMongoDBUri(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
    );
    return this.database.connect(mongoDbUri);
  }

  public async init() {
    this.logger.info('Application initialized');
    await this.connectDb();
  }
}
