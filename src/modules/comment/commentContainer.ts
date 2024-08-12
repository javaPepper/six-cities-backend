import { Container } from 'inversify';
import { CommentService } from './commentService.interface.js';
import { Component } from '../../types/components.enum.js';
import { DefaultCommentService } from './commentService.js';
import { types } from '@typegoose/typegoose';
import { CommentEntity, CommentModel } from './comment.entity.js';

export function createCommentContainer() {

  const commentContainer = new Container();
  commentContainer.bind<CommentService>(Component.CommentService).to(DefaultCommentService).inSingletonScope();
  commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

  return commentContainer;
}
