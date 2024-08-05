import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { UserType } from '../../types/userType.js';
import { createSHA256 } from '../../utils/hash.js';

export interface UserEntity extends defaultClasses.Base {}

  @modelOptions({
    schemaOptions: {
      collection: 'users',
      timestamps: true
    }
  })

export class UserEntity extends defaultClasses.TimeStamps implements UserType {

  @prop({required: true, trim: true, default: ''})
  public name: string;

  @prop({required: false, trim: true})
  public avatarPath: string;

  @prop({unique: true, required: true, trim: true})
  public email: string;

  @prop({required: true})
  private password?: string;

  @prop({ required: true })
  public isPro: boolean;

  constructor(userData: UserType) {
    super();

    this.avatarPath = userData.avatarPath;
    this.name = userData.name;
    this.isPro = userData.isPro;
    this.email = userData.email;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const userModel = getModelForClass(UserEntity);
