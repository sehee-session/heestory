export const COMMON_ERROR = {
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
  METHOD_NOT_ALLOWED: {
    status: 405,
    message: '허용되지 않은 요청 방식입니다.',
  },
  FORBIDDEN: {
    status: 403,
    message: '접근 권한이 없습니다.',
  },
} as const;
