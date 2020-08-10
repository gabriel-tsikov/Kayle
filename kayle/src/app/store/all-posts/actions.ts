import { createAction, props } from '@ngrx/store';

import { IEditComment } from '../../posts/models/edit-comment.model';
import { IPost } from '../../posts/models/post.model';


export enum actionTypes {
  GetPublicPosts = '[POSTS] Get Public Posts',
  GetDashboardPosts = '[POSTS] Get Dashboard Posts',
  GetPersonalPosts = '[POSTS] Get Personal Posts',
  GetPostsSuccess = '[POSTS] Get Posts Success',
  GetPostsFailed = '[POSTS] Get Posts Failed',

  GetSpecificPost = '[POSTS] Get Specific Post',
  GetSpecificPostSuccess = '[POSTS] Get Specific Post Success',
  GetSpecificPostFailed = '[POSTS] Get Specific Post Failed',

  CreatePost = '[POSTS] Create Post',
  CreatePostSuccess = '[POSTS] Create Post Success',
  CreatePostFailed = '[POSTS] Create Post Failed',

  UpdatePost = '[POSTS] Update Post',
  UpdatePostSuccess = '[POSTS] Update Post Success',

  ChangePostStatus = '[POSTS] Change Post Status',
  ChangePostStatusSuccess = '[POSTS] Change Post Status Success',
  ChangePostStatusFailed = '[POSTS] Change Post Status Failed',

  DeletePost = '[POSTS] Delete Post',
  DeletePostSuccess = '[POSTS] Delete Post Success',
  DeletePostFailed = '[POSTS] Delete Post Failed',

  EditComment = '[POSTS] Edit Comment',
  EditCommentSuccess = '[POSTS] Edit Comment Success',

  ClearCurrentPost = '[POSTS] Clear Current Post',
  ClearPosts = '[POSTS] Clear Posts',
}

export const getPublicPosts = createAction(
  actionTypes.GetPublicPosts,
  props<{
    payload: {
      take: number;
    };
  }>(),
);

export const getDashboardPosts = createAction(
  actionTypes.GetDashboardPosts,
  props<{
    payload: {
      take: number;
    };
  }>(),
);

export const getPersonalPosts = createAction(
  actionTypes.GetPersonalPosts,
  props<{
    payload: {
      take: number;
      userId: number;
    };
  }>(),
);

export const getPostsSuccess = createAction(
  actionTypes.GetPostsSuccess,
  props<{
    payload: {
      posts: IPost[];
      lastTake: number;
      skip: number;
    };
  }>(),
);

export const getPostsFailed = createAction(
  actionTypes.GetPostsFailed,
  props<{
    payload: {
      error: any;
    };
  }>(),
);

export const getSpecificPost = createAction(
  actionTypes.GetSpecificPost,
  props<{
    payload: {
      postId: number;
    };
  }>(),
);

export const getSpecificPostSuccess = createAction(
  actionTypes.GetSpecificPostSuccess,
  props<{
    payload: {
      post: IPost;
    };
  }>(),
);

export const getSpecificPostFailed = createAction(
  actionTypes.GetSpecificPostFailed,
  props<{
    payload: {
      error: any;
    };
  }>(),
);

export const createPost = createAction(
  actionTypes.CreatePost,
  props<{
    payload: {
      post: FormData;
    };
  }>(),
);

export const createPostSuccess = createAction(
  actionTypes.CreatePostSuccess,
  props<{
    payload: {
      post: IPost;
    };
  }>(),
);

export const createPostFailed = createAction(
  actionTypes.CreatePostFailed,
  props<{
    payload: {
      error: any;
    };
  }>(),
);

export const updatePost = createAction(
  actionTypes.UpdatePost,
  props<{
    payload: {
      post: IPost;
    };
  }>(),
);

export const updatePostSuccess = createAction(
  actionTypes.UpdatePostSuccess,
  props<{
    payload: {
      post: IPost;
    };
  }>(),
);

export const changePostStatus = createAction(
  actionTypes.ChangePostStatus,
  props<{
    payload: {
      postId: number;
      public: boolean;
    };
  }>(),
);

export const changePostStatusSuccess = createAction(
  actionTypes.ChangePostStatusSuccess,
  props<{
    payload: {
      postId: number;
      public: boolean;
    };
  }>(),
);

export const changePostStatusFailed = createAction(
  actionTypes.ChangePostStatusFailed,
  props<{
    payload: {
      error: any;
    };
  }>(),
);

export const deletePost = createAction(
  actionTypes.DeletePost,
  props<{
    payload: {
      postId: number;
      isInSinglePostPage: boolean;
    };
  }>(),
);

export const deletePostSuccess = createAction(
  actionTypes.DeletePostSuccess,
  props<{
    payload: {
      postId: number;
    };
  }>(),
);

export const deletePostFailed = createAction(
  actionTypes.DeletePostFailed,
  props<{
    payload: {
      error: any;
    };
  }>(),
);

export const editComment = createAction(
  actionTypes.EditComment,
  props<{
    payload: {
      comment: IEditComment;
    };
  }>(),
);

export const editCommentSuccess = createAction(
  actionTypes.EditCommentSuccess,
  props<{
    payload: {
      comment: IEditComment;
    };
  }>(),
);

export const clearCurrentPost = createAction(actionTypes.ClearCurrentPost);
export const clearPosts = createAction(actionTypes.ClearPosts);
