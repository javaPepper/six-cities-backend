import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/offerEntity.js';
import { UserEntity } from '../user/userEntity.js';
import { CommentType } from '../../types/commentType.js';
import { UserType } from '../../types/userType.js';

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
	schemaOptions: {
		collection: 'comments',
		timestamps: true
	}
})

export class CommentEntity extends defaultClasses.TimeStamps implements CommentType {

	@prop({trim: true, required: true})
	public content!: string;

	@prop({required: true, ref: UserEntity})
	public userid!: Ref<UserEntity>;

	@prop({required: true, ref: OfferEntity})
	public offerId!: Ref<OfferEntity>;

	@prop({required: true})
	public date!: string;

	@prop({ required: true })
	public rating!: number;

	@prop({required: true})
	public user!: UserType;

}

export const CommentModel = getModelForClass(CommentEntity);
