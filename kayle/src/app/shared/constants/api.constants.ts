import { environment } from '../../../environments/environment';

export const API_REQUESTS = {
  authentication: {
    login: `${environment.apiUrl}auth/login`,
    register: `${environment.apiUrl}auth/register`,
    logout: `${environment.apiUrl}auth/logout`,
  },
  posts: {
    all: `${environment.apiUrl}posts`,
    private: `${environment.apiUrl}posts/dashboard`,
    personal: `${environment.apiUrl}users/`,
    like: `${environment.apiUrl}posts/`,
    create: `${environment.apiUrl}posts`,
    specificPost: `${environment.apiUrl}posts/`,
  },
  comments: {
    add: `${environment.apiUrl}comments/`,
    edit: `${environment.apiUrl}comments/`,
    delete: `${environment.apiUrl}comments/`,
  },
  notifications: {
    get: `${environment.apiUrl}notifications`,
  },
  users: {
    all: `${environment.apiUrl}users`,
    specificUser: `${environment.apiUrl}users`,
    changePicture: `${environment.apiUrl}users/avatar`,
  },
};
