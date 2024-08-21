import { UserType } from './userType.js';

export type CommentType = {
    content: string
    date: string
    id?: string
    rating: number
    user: UserType
}
