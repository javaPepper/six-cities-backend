import { DocumentType } from '@typegoose/typegoose';
import { OfferDto } from './offerDto.js';
import { OfferEntity } from './offerEntity.js';

export interface OfferService {
	create(dto: OfferDto): Promise<DocumentType<OfferEntity>>,
	findByOfferId(id: string): Promise<DocumentType<OfferEntity> | null>,
	findByOfferIdOrCreate(id: string, dto: OfferDto): Promise<DocumentType<OfferEntity>>
	find(): Promise<DocumentType<OfferEntity>[]>
}
