import { Expose } from 'class-transformer';

export class CommentRdo {
    @Expose()
    public comment!: string;

    @Expose()
    public date!: string;

    @Expose()
    public id!: number;

    @Expose()
    public rating!: number;

    @Expose()
    public user!: {
        avatarPath: string
        id: number
        isPro: boolean
        name: string
    };
}
