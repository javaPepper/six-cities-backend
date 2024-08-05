import { Offer } from '../../types/enums.js';

export class OfferDto {
	public bedrooms!: number;
	public city!: {
		location: {
			latitude: number
			longitude: number
			zoom: number
		}
		name: string
	};

	public description!: string;
	public goods!: string[];
	public host!: {
		avatarUrl: string
		id: number
		isPro: boolean
		name: string
	};

	public id!: string;
	public images!: string[];
	public isFavorite!: boolean;
	public isPremium!: boolean;
	public location!: {
		latitude: number
		longitude: number
		zoom: number
	};

	public maxAdults!: number;
	public previewImage!: string;
	public price!: number;
	public rating!: number;
	public title!: string;
	public type!: Offer;
}
