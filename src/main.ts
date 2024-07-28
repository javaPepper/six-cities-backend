import { Container } from 'inversify';
import 'reflect-metadata';

import { AppConfig } from './appConfig/config.js';
import { PinoLogger } from './logger/pino.logger.js';
import { Application } from './rest/application.js';
import { Component } from './types/component.enum.js';
import { Schema } from './appConfig/schema.js';
import { Config } from './appConfig/config.interface.js';
import { Logger } from './logger/logger.interface.js';

(async function() {
  const container = new Container();
  container.bind<Application>(Component.Application).to(Application).inSingletonScope();
  container.bind<Config<Schema>>(Component.Config).to(AppConfig).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  const application = container.get<Application>(Component.Application);
  await application.init();
})();
