export interface IFollower {
  id: number;
  username: string;
  email: string;
  avatar: string;
  isDeleted: boolean;
  postsCount: number;
  roles: [];
  followersCount: number;
  followingCount: number;
}
