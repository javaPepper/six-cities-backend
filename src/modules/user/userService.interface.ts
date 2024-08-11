import { DocumentType } from '@typegoose/typegoose';
import { createUserDto } from './dto/createUserDto.js';
import { UserEntity } from './userEntity.js';
import { UpdateUserDto } from './dto/updateUserDto.js';

export interface UserService {
	create(dto: createUserDto, salt: string): Promise<DocumentType<UserEntity>>;
	findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
	findOrCreate(dto: createUserDto, salt: string): Promise<DocumentType<UserEntity>>;
	updateById(dto: UpdateUserDto, userId: string): Promise<DocumentType<UserEntity> | null>;
}
