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
    STORY: (username?: string) => `${PATHS.USERS.BASE}/${username}`,
  },
  AUTH: { SIGN_IN: '/sign-in' },
} as const;
