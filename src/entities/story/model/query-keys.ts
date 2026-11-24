export const storyQueryKeys = {
  all: ['stories'] as const,
  lists: (userKey?: string) =>
    [...storyQueryKeys.all, 'list', userKey] as const,
};
