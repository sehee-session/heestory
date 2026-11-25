export const PATHS = {
  HOME: '/',
  STORY: {
    BASE: '/stories',
    DETAIL: (id: string) => `${PATHS.STORY.BASE}/${id}`,
    WRITE: `/stories/new`,
    EDIT: (id: string) => `${PATHS.STORY.BASE}/${id}/edit`,
  },
  USERS: {
    BASE: '/users',
    DETAIL: (username?: string) => `${PATHS.USERS.BASE}/${username}`,
    EDIT: (username?: string) => `${PATHS.USERS.BASE}/${username}/edit`,
  },
  AUTH: { SIGN_IN: '/sign-in' },
} as const;
