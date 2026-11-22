import { useInfiniteQuery } from '@tanstack/react-query';
import { fetcher } from '~/shared/api';
import { API_PATHS } from '~/shared/constants';
import { storyQueryKeys } from '../model/query-keys';
import type { Story } from '../model/types';

const PAGE_SIZE = 2;

export const useStoryListQuery = () =>
  useInfiniteQuery({
    queryKey: storyQueryKeys.lists(),
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams({ first: String(PAGE_SIZE) });

      if (pageParam) {
        params.set('after', pageParam);
      }

      return fetcher.get<{
        stories: Story[];
        nextCursor: string | null;
        hasNextPage: boolean;
      }>(API_PATHS.STORY.LIST, params);
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage && lastPage.nextCursor
        ? lastPage.nextCursor
        : undefined,
  });
