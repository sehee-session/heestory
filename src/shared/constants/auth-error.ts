export const AUTH_ERROR = {
  CONTEXT_NOT_FOUND: {
    status: 500,
    message: '인증 정보를 찾을 수 없습니다.',
  },
  SESSION_NOT_FOUND: {
    status: 401,
    message: '인증 세션을 확인할 수 없습니다.',
  },
  UNAUTHORIZED: {
    status: 401,
    message: '로그인이 필요합니다.',
  },
} as const;
