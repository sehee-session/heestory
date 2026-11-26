export const USER_ERROR = {
  INVALID_INPUT: {
    status: 400,
    message: '입력한 내용을 확인해주세요.',
  },
  CREATE_FAILED: {
    status: 500,
    message: '사용자 저장에 실패했습니다.',
  },
  NOT_FOUND: {
    status: 404,
    message: '사용자를 찾을 수 없습니다.',
  },
  UPDATE_FAILED: {
    status: 500,
    message: '사용자 수정에 실패했습니다.',
  },
  USERNAME_REQUIRED: {
    status: 400,
    message: '사용자 이름이 필요합니다.',
  },
  ID_REQUIRED: {
    status: 400,
    message: '사용자 ID가 필요합니다.',
  },
} as const;
