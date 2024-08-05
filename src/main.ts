import { Container } from 'inversify';
import 'reflect-metadata';
import { Application } from './rest/application.js';
import { Component } from './types/components.enum.js';

import { createAppContainer } from './rest/appContainer.js';
import { createUserContainer } from './modules/user/userContainer.js';
import { createOfferContainer } from './modules/offer/offerContainer.js';

(async function() {

  const appContainer = Container.merge(
	createAppContainer(),
	createUserContainer(),
	createOfferContainer());

  const application = appContainer.get<Application>(Component.Application);

  await application.init();
})();
