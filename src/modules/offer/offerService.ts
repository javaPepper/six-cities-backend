import { inject } from 'inversify';
import { OfferService } from './offerService.interface.js';
import { Component } from '../../types/components.enum.js';
import { types } from '@typegoose/typegoose';
import { OfferEntity } from './offerEntity.js';

export class DefaultOfferService implements OfferService {

  constructor(
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) { }

  public async getFavorites(): Promise<types.DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({ isFavorite: 1 })
      .exec();
  }

  public async findNearbyOffers(id: string): Promise<types.DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ id })
      .exec();
  }

  public async findByOfferId(id: string): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(id)
      .exec();
  }

  public async find(): Promise<types.DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .exec();
  }


  public async toggleFavorite(offerId: string, isFavorite: boolean): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, { $set: { isFavorite: !isFavorite } })
      .exec();
  }
}
