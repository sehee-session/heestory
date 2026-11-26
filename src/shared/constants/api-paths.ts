export const API_PATHS = {
  AUTH: {
    BASE: '/api/auth',
    SIGN_IN: () => `${API_PATHS.AUTH.BASE}/sign-in`,
    SIGN_OUT: () => `${API_PATHS.AUTH.BASE}/sign-out`,
    CALLBACK: () => `${API_PATHS.AUTH.BASE}/callback`,
    WITHDRAWAL: () => `${API_PATHS.AUTH.BASE}/withdrawal`,
  },
  STORY: {
    BASE: '/api/stories',
    DETAIL: (id: string) => `${API_PATHS.STORY.BASE}/${id}`,
    LIST: () => `${API_PATHS.STORY.BASE}/list`,
  },
  USER: {
    BASE: '/api/users',
    DETAIL: (id: string) => `${API_PATHS.USER.BASE}/${id}`,
  },
} as const;
