import { Expose } from 'class-transformer';

export class UserRdo {
    @Expose()
    public name!: string;

    @Expose()
    public id!: string;

    @Expose()
    public email!: string;

    @Expose()
    public avatarPath!: string;
}
