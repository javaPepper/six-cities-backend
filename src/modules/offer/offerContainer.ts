import { Container } from 'inversify';
import { OfferService } from './offerService.interface.js';
import { Component } from '../../types/components.enum.js';
import { DefaultOfferService } from './offerService.js';
import { types } from '@typegoose/typegoose';
import { OfferModel, OfferEntity } from './offerEntity.js';
import { Controller } from '../../types/controllerType.js';
import { OfferController } from './offerController.js';

export function createOfferContainer() {

	const container = new Container();
	container.bind<OfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();
	container.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
	container.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();

	return container;
}
