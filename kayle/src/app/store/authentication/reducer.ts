import { createReducer, on } from '@ngrx/store';

import {
  decreaseLoggedInUserPostsCount,
  increaseLoggedInUserPostCount,
  changeLoggedUserAvatarSuccess,
  changeLoggedUserAvatarFailed,
  getLoggedUserInfoSuccess,
  logoutSuccess,
  getAvatarInfo,
  loginPersist,
  loginSuccess,
  loginFailed,
} from './actions';
import { IAvatar } from 'src/app/shared/models/avatar-profile.model';
import { IUser } from '../../users/models/user.model';


export interface IAuthState {
  token: string;
  username: string;
  loggedUser: IUser;
  errorMessage: string;
  avatarAndUsername: IAvatar;
}

const initialAuthState: IAuthState = {
  token: null,
  username: null,
  loggedUser: null,
  errorMessage: null,
  avatarAndUsername: null,
};

const _authReducer = createReducer(
  initialAuthState,
  on(loginSuccess, (state, { payload }) => ({
    ...state,
    token: payload.token,
    username: payload.username,
  })),
  on(loginFailed, (state, { payload }) => ({
    ...state,
    errorMessage: payload.error.message,
  })),
  on(loginPersist, (state, { payload }) => ({
    ...state,
    token: payload.token,
    username: payload.username,
  })),
  on(logoutSuccess, (state) => ({
    ...state,
    ...initialAuthState,
  })),
  on(getLoggedUserInfoSuccess, (state, { payload }) => ({
    ...state,
    loggedUser: payload.user,
  })),
  on(changeLoggedUserAvatarSuccess, (state, { payload }) => ({
    ...state,
    loggedUser: { ...state.loggedUser, avatar: payload.avatarUrl },
  })),
  on(changeLoggedUserAvatarFailed, (state, { payload }) => ({
    ...state,
    errorMessage: payload.error.message,
  })),
  on(getAvatarInfo, (state, { payload }) => ({
    ...state,
    avatarAndUsername: payload.avatarAndUsername,
  })),
  on(increaseLoggedInUserPostCount, (state) => ({
    ...state,
    loggedUser: { ...state.loggedUser, postsCount: state.loggedUser?.postsCount + 1 },
  })),
  on(decreaseLoggedInUserPostsCount, (state) => ({
    ...state,
    loggedUser: { ...state.loggedUser, postsCount: state.loggedUser?.postsCount - 1 },
  })),
);

export function authReducer(state, action) {
  return _authReducer(state, action);
}
