import { Container } from 'inversify';
import { Database } from '../database/database.interface.js';
import { Application } from './application.js';
import { Logger } from '../logger/logger.interface.js';
import { Component } from '../types/components.enum.js';
import { AppConfig } from '../appConfig/config.js';
import { PinoLogger } from '../logger/pinoLogger.js';
import { MongoDatabase } from '../database/mongoDatabase.js';
import { Schema } from '../appConfig/schema.js';
import { Config } from '../appConfig/config.interface.js';

export function createAppContainer() {
  const container = new Container();
  container.bind<Application>(Component.Application).to(Application).inSingletonScope();
  container.bind<Config<Schema>>(Component.Config).to(AppConfig).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Database>(Component.MongoDatabase).to(MongoDatabase).inSingletonScope();

  return container;
}
