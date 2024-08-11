import { inject } from 'inversify';
import { OfferService } from './offerService.interface.js';
import { Component } from '../../types/components.enum.js';
import { Logger } from '../../logger/logger.interface.js';
import { types } from '@typegoose/typegoose';
import { OfferEntity } from './offerEntity.js';
import { OfferDto } from './offerDto.js';

export class DefaultOfferService implements OfferService {

  constructor(
	@inject(Component.Logger) private readonly logger: Logger,
	@inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ){}

  public async create(dto: OfferDto): Promise<types.DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer "${dto.id}" was created`);

    return result;
  }

  public async findByOfferId(id: string): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(id).exec();
  }

  public async findByOfferIdOrCreate(id: string, dto: OfferDto): Promise<types.DocumentType<OfferEntity>> {
    const existedOffer = await this.findByOfferId(id);

    if(existedOffer) {
      return existedOffer;
    }
	return this.offerModel.create(dto);
  }

  public async find(): Promise<types.DocumentType<OfferEntity>[]> {
	return this.offerModel
	.find()
	.exec();
  }
}
