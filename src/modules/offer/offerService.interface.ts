import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offerEntity.js';

export interface OfferService {
	find(): Promise<DocumentType<OfferEntity>[]>,
	findNearbyOffers(id: string): Promise<DocumentType<OfferEntity>[]>
	findByOfferId(id: string): Promise<DocumentType<OfferEntity> | null>,
	getFavorites(): Promise<DocumentType<OfferEntity>[]>,
	toggleFavorite(offferId: string, isFavorite: boolean): Promise<DocumentType<OfferEntity> | null>,
}
