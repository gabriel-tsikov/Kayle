import { IAuthor } from 'src/app/posts/models/author.model';
import { IPost } from 'src/app/posts/models/post.model';

export interface INotification {
  id: number;
  type: string;
  status: string;
  createdOn: number;
  notificationAuthor: IAuthor;
  post: IPost;
}
