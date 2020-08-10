import { IAuthor } from './author.model';
import { IPost } from './post.model';

export interface IEditComment {
  author: IAuthor;
  content: 'string';
  createdOn: number;
  id: number;
  post: IPost;
  updatedOn: number;
}
