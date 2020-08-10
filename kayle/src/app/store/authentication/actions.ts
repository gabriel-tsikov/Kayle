import { createAction, props } from '@ngrx/store';

import { IAvatar } from 'src/app/shared/models/avatar-profile.model';
import { IUser } from '../../users/models/user.model';


export enum authActionTypes {
  Login = '[AUTHENTICATION] Login',
  LoginSuccess = '[AUTHENTICATION] Login Success',
  LoginFailed = '[AUTHENTICATION] Login Failed',

  LoginPersist = '[AUTHENTICATION] Login Persisted',

  GetLoggedUserInfo = '[LOGGED USER] Get Info',
  GetLoggedUserInfoSuccess = '[LOGGED USER] Get Info Success',
  ChangeLoggedUserAvatar = '[LOGGED USER] Change Avatar',
  ChangeLoggedUserAvatarSuccess = '[LOGGED USER] Change Avatar Success',
  ChangeLoggedUserAvatarFailed = '[LOGGED USER] Change Avatar Failed',
  GetAvatarInfo = '[LOGGED USER] Get Avatar Info',
  IncreaseLoggedInUserPostCount = '[LOGGED USER] Increase Posts Count',
  DecreaseLoggedUserPostsCount = '[LOGGED USER] Decrease Posts Count',

  Logout = '[AUTHENTICATION] Logout',
  LogoutSuccess = '[AUTHENTICATION] Logout Success',
  LogoutFailed = '[AUTHENTICATION] Logout Failed',
}

export const login = createAction(
  authActionTypes.Login,
  props<{
    payload: {
      username: string;
      password: string;
    };
  }>(),
);

export const loginSuccess = createAction(
  authActionTypes.LoginSuccess,
  props<{
    payload: {
      token: string;
      username: string;
    };
  }>(),
);

export const loginFailed = createAction(
  authActionTypes.LoginFailed,
  props<{
    payload: {
      error: any;
    };
  }>(),
);

export const loginPersist = createAction(
  authActionTypes.LoginPersist,
  props<{
    payload: {
      token: string;
      username: string;
    };
  }>(),
);

export const getLoggedUserInfo = createAction(
  authActionTypes.GetLoggedUserInfo,
  props<{
    payload: {
      username: string;
    };
  }>(),
);

export const getLoggedUserInfoSuccess = createAction(
  authActionTypes.GetLoggedUserInfoSuccess,
  props<{
    payload: {
      user: IUser;
    };
  }>(),
);

export const changeLoggedUserAvatar = createAction(
  authActionTypes.ChangeLoggedUserAvatar,
  props<{
    payload: {
      data: FormData;
    };
  }>(),
);

export const changeLoggedUserAvatarSuccess = createAction(
  authActionTypes.ChangeLoggedUserAvatarSuccess,
  props<{
    payload: {
      avatarUrl: string;
    };
  }>(),
);

export const changeLoggedUserAvatarFailed = createAction(
  authActionTypes.ChangeLoggedUserAvatarFailed,
  props<{
    payload: {
      error: any;
    };
  }>(),
);

export const getAvatarInfo = createAction(
  authActionTypes.GetAvatarInfo,
  props<{
    payload: {
      avatarAndUsername: IAvatar;
    };
  }>(),
);

export const logout = createAction(authActionTypes.Logout);
export const logoutSuccess = createAction(authActionTypes.LogoutSuccess);
export const logoutFailed = createAction(authActionTypes.LogoutFailed);
export const increaseLoggedInUserPostCount = createAction(authActionTypes.IncreaseLoggedInUserPostCount);
export const decreaseLoggedInUserPostsCount = createAction(authActionTypes.DecreaseLoggedUserPostsCount);
