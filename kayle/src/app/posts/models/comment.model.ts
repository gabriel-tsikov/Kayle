import { IAuthor } from './author.model';

export interface IComment {
  id: number;
  content: string;
  createdOn: number;
  updatedOn: number;
  author: IAuthor;
}
