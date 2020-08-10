import { createReducer, on } from '@ngrx/store';

import { IPost } from '../../posts/models/post.model';
import {
  changePostStatusSuccess,
  changePostStatusFailed,
  getSpecificPostSuccess,
  getSpecificPostFailed,
  editCommentSuccess,
  updatePostSuccess,
  createPostSuccess,
  deletePostSuccess,
  getDashboardPosts,
  clearCurrentPost,
  getPersonalPosts,
  deletePostFailed,
  changePostStatus,
  createPostFailed,
  getSpecificPost,
  getPostsSuccess,
  getPostsFailed,
  getPublicPosts,
  clearPosts,
  createPost,
  deletePost,
} from './actions';
import { DASHBOARD, PERSONAL, PUBLIC } from '../../posts/constants/posts-path.constants';


export interface IPostsState {
  errorMessage: string;
  isLastTake: boolean;
  currentPost: IPost;
  isLoading: boolean;
  postsType: string;
  posts: IPost[];
  skip: number;
}

export const initialPostsState: IPostsState = {
  posts: [],
  currentPost: null,
  postsType: null,
  isLastTake: false,
  isLoading: false,
  errorMessage: null,
  skip: 0,
};

const _allPostsReducer = createReducer(
  initialPostsState,
  on(getPublicPosts, (state) => ({
    ...state,
    isLoading: true,
    postsType: PUBLIC,
  })),
  on(getDashboardPosts, (state) => ({
    ...state,
    isLoading: true,
    postsType: DASHBOARD,
  })),
  on(getPersonalPosts, (state) => ({
    ...state,
    isLoading: true,
    postsType: PERSONAL,
  })),
  on(getPostsSuccess, (state, { payload }) => ({
    ...state,
    isLastTake: payload.posts.length - payload.lastTake < 0,
    isLoading: false,
    skip: payload.skip + payload.posts.length,
    posts: !state.isLastTake ? [...state.posts, ...payload.posts] : [...state.posts],
  })),
  on(getPostsFailed, (state, { payload }) => ({
    ...state,
    isLoading: false,
    errorMessage: payload.error.message,
  })),
  on(getSpecificPost, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getSpecificPostSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    currentPost: payload.post,
  })),
  on(getSpecificPostFailed, (state, { payload }) => ({
    ...state,
    isLoading: false,
    errorMessage: payload.error.message,
  })),
  on(createPost, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(createPostSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    posts: [payload.post, ...state.posts],
  })),
  on(createPostFailed, (state, { payload }) => ({
    ...state,
    isLoading: false,
    errorMessage: payload.error.message,
  })),
  on(updatePostSuccess, (state, { payload }) => ({
    ...state,
    posts: state.posts.map(post => {
      if (post.id === payload.post.id) {
        return payload.post;
      }
      return post;
    }),
    currentPost: state.currentPost?.id === payload.post?.id ? payload.post : state.currentPost,
  })),
  on(changePostStatus, (state) => ({
    ...state,
  })),
  on(changePostStatusSuccess, (state, { payload }) => ({
    ...state,
    posts: state.posts.map(post => {
      if (post.id === payload.postId) {
        return {
          ...post,
          public: payload.public,
        };
      }
      return post;
    }),
    currentPost: state.currentPost?.id === payload.postId ? {
      ...state.currentPost,
      public: payload.public,
    } : state.currentPost,
  })),
  on(changePostStatusFailed, (state, { payload }) => ({
    ...state,
    errorMessage: payload.error.message,
  })),
  on(deletePost, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(deletePostSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    posts: state.posts.filter(post => post.id !== payload.postId),
    currentPost: state.currentPost?.id === payload?.postId ? null : state.currentPost,
  })),
  on(deletePostFailed, (state, { payload }) => ({
    ...state,
    isLoading: false,
    errorMessage: payload.error.message,
  })),
  on(editCommentSuccess, (state, { payload }) => ({
    ...state,
    posts: state.posts.map(post => {
      if (post.id === payload.comment.post.id) {
        return {
          ...post,
          comments: post?.comments?.map(comment => {
            if (comment.id === payload.comment.id) {
              return {
                ...comment,
                content: payload.comment.content,
              };
            }
            return comment;
          }),
        };
      }
      return post;
    }),
    currentPost: {
      ...state.currentPost, comments: state.currentPost?.comments?.map(comment => {
        if (comment.id === payload.comment.id) {
          return {
            ...comment,
            content: payload.comment.content,
          };
        }
        return comment;
      }),
    },
  })),
  on(clearCurrentPost, (state) => ({
    ...state,
    currentPost: null,
  })),
  on(clearPosts, (state) => ({
    ...state,
    ...initialPostsState,
  })),
);

export function allPostsReducer(state, action) {
  return _allPostsReducer(state, action);
}
