import { IAuthor } from './author.model';

export interface ILike {
  id: number;
  votedBy: IAuthor;
}
