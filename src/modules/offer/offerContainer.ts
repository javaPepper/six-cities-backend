import { Container } from 'inversify';
import { OfferService } from './offerService.interface.js';
import { Component } from '../../types/components.enum.js';
import { DefaultOfferService } from './offerService.js';
import { types } from '@typegoose/typegoose';
import { OfferModel, OfferEntity } from './offerEntity.js';

export function createOfferContainer() {

	const container = new Container();
	container.bind<OfferService>(Component.OfferService).to(DefaultOfferService);
	container.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);

	return container;
}
