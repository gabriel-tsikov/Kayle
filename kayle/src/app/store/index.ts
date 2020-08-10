import { createFeatureSelector, createSelector } from '@ngrx/store';

import { authReducer, IAuthState } from './authentication/reducer';
import { allPostsReducer, IPostsState } from './all-posts/reducer';
import * as authSelectors from './authentication/selectors';
import * as allPostsSelectors from './all-posts/selectors';


export const reducers = {
  authentication: authReducer,
  allPosts: allPostsReducer,
};

export interface IAppState {
  authentication: IAuthState;
  allPosts: IPostsState;
}

/* Authentication Selectors */
export const getAuthStore = createFeatureSelector('authentication');
export const getToken = createSelector(getAuthStore, authSelectors.getToken);
export const getIsUserLoggedIn = createSelector(getToken, token => !!token);
export const getLoggedUser = createSelector(getAuthStore, authSelectors.getLoggedUser);
export const getLoggedUsername = createSelector(getAuthStore, authSelectors.getUsername);
export const getErrorMessageAuth = createSelector(getAuthStore, authSelectors.getErrorMessage);
export const getAvatarInfo = createSelector(getAuthStore, authSelectors.getAvatarInfo);


/* All Posts Selector */
export const getAllPostsStore = createFeatureSelector('allPosts');
export const getAllPosts = createSelector(getAllPostsStore, allPostsSelectors.getPosts);
export const getPostAuthorUsername = createSelector(getAllPosts, posts => posts[0]?.author.username);
export const getPostsType = createSelector(getAllPostsStore, allPostsSelectors.getPostsType);
export const getCurrentPost = createSelector(getAllPostsStore, allPostsSelectors.getCurrentPost);
export const getIsLastTake = createSelector(getAllPostsStore, allPostsSelectors.getIsLastTake);
export const getIsLoading = createSelector(getAllPostsStore, allPostsSelectors.getIsLoading);
export const getErrorMessageAllPosts = createSelector(getAllPostsStore, allPostsSelectors.getErrorMessage);
export const getSkip = createSelector(getAllPostsStore, allPostsSelectors.getSkip);
