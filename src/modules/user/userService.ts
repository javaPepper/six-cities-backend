import { DocumentType, types } from '@typegoose/typegoose';
import { UserDto } from './userDto.js';
import { UserEntity } from './userEntity.js';
import { UserService } from './userService.interface.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/components.enum.js';
import { Logger } from '../../logger/logger.interface.js';

@injectable()
export class DefaultUserService implements UserService {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ){}

  public async create(dto: UserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user was created with ${user.email} email`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async findOrCreate(dto: UserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if(existedUser) {
      return existedUser;
    }
    return await this.create(dto, salt);
  }
}
