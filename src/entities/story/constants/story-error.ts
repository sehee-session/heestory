export const STORY_ERROR = {
  INVALID_INPUT: {
    status: 400,
    message: '입력한 내용을 확인해주세요.',
  },
  CREATE_FAILED: {
    status: 500,
    message: '스토리 저장에 실패했습니다.',
  },
  NOT_FOUND: {
    status: 404,
    message: '스토리를 찾을 수 없습니다.',
  },
} as const;
