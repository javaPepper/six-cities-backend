import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { CommentDto } from './commentDto.js';

export interface CommentService {
	create(dto: CommentDto): Promise<DocumentType<CommentEntity>>,
	deleteCommentById(commentId: string, offerId: string): Promise<number | null>,
	find(): Promise<DocumentType<CommentEntity>[]>
}
