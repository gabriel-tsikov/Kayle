import { IAuthState } from './reducer';

export const getToken = (state: IAuthState) => state.token;
export const getUsername = (state: IAuthState) => state.username;
export const getLoggedUser = (state: IAuthState) => state.loggedUser;
export const getErrorMessage = (state: IAuthState) => state.errorMessage;
export const getAvatarInfo = (state: IAuthState) => state.avatarAndUsername;
