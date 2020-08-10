import { IFollower } from './follower.model';

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar: string;
  isDeleted: boolean;
  postsCount: number;
  roles: [];
  followers: IFollower[];
  following: IFollower[];
  followersCount: number;
  followingCount: number;
}
