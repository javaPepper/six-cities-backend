import { DocumentType } from '@typegoose/typegoose';
import { UserDto } from './userDto.js';
import { UserEntity } from './userEntity.js';

export interface UserService {
	create(dto: UserDto, salt: string): Promise<DocumentType<UserEntity>>;
	findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
	findOrCreate(dto: UserDto, salt: string): Promise<DocumentType<UserEntity>>
}
