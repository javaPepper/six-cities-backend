import { Container } from 'inversify';
import 'reflect-metadata';
import { Application } from './rest/application.js';
import { Component } from './types/components.enum.js';

import { createAppContainer } from './rest/appContainer.js';
import { createUserContainer } from './modules/user/userContainer.js';
import { createOfferContainer } from './modules/offer/offerContainer.js';
import { createCommentContainer } from './modules/comment/commentContainer.js';

(async function() {

  const appContainer = Container.merge(
	createAppContainer(),
	createUserContainer(),
	createOfferContainer(),
	createCommentContainer()
);

  const application = appContainer.get<Application>(Component.Application);

  await application.init();
})();
