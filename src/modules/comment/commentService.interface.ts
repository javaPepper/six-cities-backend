import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { CommentDto } from './commentDto.js';

export interface CommentService {
	create(dto: CommentDto): Promise<DocumentType<CommentEntity>>;
	findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>
	deleteCommentById(commentId: string): Promise<number | null>
}
