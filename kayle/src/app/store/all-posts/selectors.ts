import { IPostsState } from './reducer';

export const getPosts = (state: IPostsState) => state.posts;
export const getCurrentPost = (state: IPostsState) => state.currentPost;
export const getPostsType = (state: IPostsState) => state.postsType;
export const getIsLastTake = (state: IPostsState) => state.isLastTake;
export const getIsLoading = (state: IPostsState) => state.isLoading;
export const getErrorMessage = (state: IPostsState) => state.errorMessage;
export const getSkip = (state: IPostsState) => state.skip;
