import { inject, injectable } from 'inversify';
import { CommentService } from './commentService.interface.js';
import { Component } from '../../types/components.enum.js';
import { types } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { CommentDto } from './commentDto.js';

@injectable()
export class DefaultCommentService implements CommentService {

	constructor(
		@inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
	){}

	public async create(dto: CommentDto): Promise<types.DocumentType<CommentEntity>> {
		const comment = await this.commentModel.create(dto);
		return comment.populate('userId');
	}

	public async findByOfferId(offerId: string): Promise<types.DocumentType<CommentEntity>[]> {
		return this.commentModel
			.find({offerId})
			.populate('userId');
	}

	public async deleteCommentById(commentId: string): Promise<number | null> {
		const result = await this.commentModel
			.deleteMany({commentId})
			.exec();

		return result.deletedCount;
	}
}
