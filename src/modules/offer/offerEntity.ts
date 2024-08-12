import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { OfferType } from '../../types/offerType.js';
import { CityType } from '../../types/cityType.js';
import { Goods, Offer } from '../../types/enums.js';
import { UserEntity } from '../user/userEntity.js';
import { LocationType } from '../../types/locationType.js';
import { UserType } from '../../types/userType.js';

export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true
  }
})

export class OfferEntity extends defaultClasses.TimeStamps implements OfferType {

  @prop({ required: true, min: 1, max: 8 })
  public bedrooms!: number;

  @prop({ required: true, type: () => Object })
  public city!: CityType;

  @prop({ required: true })
  public description!: string;

  @prop({ required: true, type: () => Array<Goods> })
  public goods!: Goods;

  @prop({ required: true, type: () => Object })
  public host!: UserType;

  @prop({ required: true, ref: UserEntity })
  public userId!: Ref<UserEntity>;

  @prop({ required: true, type: () => Array<string> })
  public images!: string[];

  @prop({ required: true })
  public isFavorite!: boolean;

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ required: true })
  public location!: LocationType;

  @prop({ required: true, min: 1, max: 10 })
  public maxAdults!: number;

  @prop({ required: true })
  public previewImage!: string;

  @prop({ required: true, min: 100, max: 100000 })
  public price!: number;

  @prop({ required: true, min: 1, max: 5 })
  public rating!: number;

  @prop({ required: true })
  public title!: string;

  @prop({ required: true, type: () => Offer, enum: Offer })
  public type!: Offer;
}

export const OfferModel = getModelForClass(OfferEntity);
