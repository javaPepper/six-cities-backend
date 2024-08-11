import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/offerEntity.js';
import { UserEntity } from '../user/userEntity.js';

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
	schemaOptions: {
		collection: 'comments'
	}
})

export class CommentEntity extends defaultClasses.TimeStamps {

	@prop({trim: true, required: true})
	public content!: string;

	@prop({required: true, ref: UserEntity})
	public userId!: Ref<UserEntity>;

	@prop({required: true, ref: OfferEntity})
	public offerId!: Ref<OfferEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
