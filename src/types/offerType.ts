import { CityType } from './cityType.js';
import { Goods, Offer } from '../types/enums.js';
import { UserType } from './userType.js';
import { LocationType } from './locationType.js';

export type OfferType = {
  bedrooms: number,
  city: CityType,
  description: string,
  goods: Goods,
  host: UserType,
  images: string[],
  isFavorite: boolean,
  isPremium: boolean,
  location: LocationType,
  maxAdults: number,
  previewImage: string,
  price: number,
  rating: number,
  title: string,
  type: Offer
};
