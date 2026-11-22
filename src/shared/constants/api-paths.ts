export const API_PATHS = {
  AUTH: {
    SIGN_IN: '/api/auth/sign-in',
    SIGN_OUT: '/api/auth/sign-out',
    CALLBACK: '/api/auth/callback',
  },
  STORY: {
    BASE: '/api/stories',
    DETAIL: (id: string) => `${API_PATHS.STORY.BASE}/${id}`,
    LIST: '/api/stories/list',
  },
} as const;
