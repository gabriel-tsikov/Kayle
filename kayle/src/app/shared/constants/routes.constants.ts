export const APP_ROUTES = {
  homepage: {
    path: 'home',
  },
  dashboard: {
    path: 'dashboard',
  },
  users: {
    children: {
      following: 'following',
      followers: 'followers',
    },
  },
  nonExistent: {
    path: '404',
  },
};
