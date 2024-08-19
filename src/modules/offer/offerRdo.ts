import { Expose } from 'class-transformer';
import { CityType } from '../../types/cityType.js';
import { Goods, Offer } from '../../types/enums.js';
import { UserType } from '../../types/userType.js';
import { LocationType } from '../../types/locationType.js';

export class OfferRdo {
    @Expose()
    public bedrooms!: number;

    @Expose()
	public city!: CityType;

    @Expose()
	public description!: string;

    @Expose()
	public goods!: Goods;

    @Expose()
	public host!: UserType;

    @Expose()
	public images!: string[];

    @Expose()
	public isFavorite?: boolean;

    @Expose()
	public isPremium!: boolean;

    @Expose()
	public location!: LocationType;

    @Expose()
	public maxAdults!: number;

    @Expose()
	public previewImage!: string;

    @Expose()
	public price!: number;

    @Expose()
	public rating!: number;

    @Expose()
	public title!: string;

    @Expose()
    public type!: Offer;
}
