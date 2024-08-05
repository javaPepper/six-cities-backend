import { Container } from 'inversify';
import { UserService } from './userService.interface.js';
import { Component } from '../../types/components.enum.js';
import { DefaultUserService } from './userService.js';
import { types } from '@typegoose/typegoose';
import { UserEntity, userModel } from './userEntity.js';

export function createUserContainer() {

  const userContainer = new Container();
  userContainer.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(userModel);

  return userContainer;
}
