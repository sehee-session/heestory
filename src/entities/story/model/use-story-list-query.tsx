import { useInfiniteQuery } from '@tanstack/react-query';
import { storyQueryKeys } from './query-keys';
import type { Story } from './types';

const PAGE_SIZE = 2;

export const useStoryListQuery = () =>
  useInfiniteQuery({
    queryKey: storyQueryKeys.lists(),
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams({ first: String(PAGE_SIZE) });

      if (pageParam) {
        params.set('after', pageParam);
      }

      const response = await fetch(`/api/story/list?${params}`);

      if (!response.ok) {
        throw new Error('스토리 목록을 불러오지 못했습니다.');
      }

      return response.json() as Promise<{
        stories: Story[];
        nextCursor: string | null;
        hasNextPage: boolean;
      }>;
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage && lastPage.nextCursor
        ? lastPage.nextCursor
        : undefined,
  });
