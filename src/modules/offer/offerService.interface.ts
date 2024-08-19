import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offerEntity.js';
import { OfferDto } from './offerDto.js';

export interface OfferService {
	create(dto: OfferDto): Promise<DocumentType<OfferEntity>>,
	find(): Promise<DocumentType<OfferEntity>[]>,
	findNearbyOffers(id: string): Promise<DocumentType<OfferEntity>[]>
	findByOfferId(id: string): Promise<DocumentType<OfferEntity> | null>,
	getFavorites(): Promise<DocumentType<OfferEntity>[]>,
	toggleFavorite(offferId: string, isFavorite: boolean): Promise<DocumentType<OfferEntity> | null>,
}
