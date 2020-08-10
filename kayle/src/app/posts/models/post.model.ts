import { IComment } from './comment.model';
import { IAuthor } from './author.model';
import { ILike } from './like.model';
import { IImage } from './image.model';

export interface IPost{
    id: number;
    createdOn: number;
    updatedOn: number;
    description: string;
    location: string;
    public: boolean;
    image: IImage;
    author: IAuthor;
    comments: IComment[];
    commentsCount: number;
    likes: ILike[];
    likesCount: number;
}
