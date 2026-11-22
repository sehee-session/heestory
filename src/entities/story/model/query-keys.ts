export const storyQueryKeys = {
  all: ['stories'] as const,
  lists: () => [...storyQueryKeys.all, 'list'] as const,
};
