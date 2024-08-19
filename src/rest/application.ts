import { inject, injectable } from 'inversify';
import { Config } from '../appConfig/config.interface.js';
import { Schema } from '../appConfig/schema.js';
import { Logger } from '../logger/logger.interface.js';
import { Component } from '../types/components.enum.js';
import { Database } from '../database/database.interface.js';
import { setMongoDBUri } from '../utils/databaseUri.js';
import express, { Express } from 'express';
import { UserController } from '../modules/user/userController.js';

@injectable()
export class Application {
  private readonly server!: Express;

  constructor(
		@inject(Component.Logger) private readonly logger: Logger,
		@inject(Component.Config) private readonly config: Config<Schema>,
    @inject(Component.MongoDatabase) private readonly database: Database,
    @inject(Component.UserController) private readonly userController: UserController
  ){
    this.server = express();
  }


  private async connectDb(){
    const mongoDbUri = setMongoDBUri(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
    );
    return this.database.connect(mongoDbUri);
  }

  private async initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async initControllers() {
    this.server.use('/users', this.userController.router);
  }

  private async initMiddleware() {
    this.server.use(express.json());
  }

  public async init() {
    await this.connectDb();
    this.logger.info('Application initialized');

    await this.initMiddleware();
    this.logger.info('Middleware initialized');

    await this.initControllers();
    this.logger.info('Controller initialization completed');

    await this.initServer();
    this.logger.info(`The server is on localhost:${this.config.get('PORT')}`);
  }
}
