import { useInfiniteQuery } from '@tanstack/react-query';
import { fetcher } from '~/shared/api';
import { API_PATHS } from '~/shared/constants';
import { storyQueryKeys } from '../model/query-keys';
import type { StoryResponse } from '../model/response';

const PAGE_SIZE = 2;

export const useStoryListQuery = ({ userKey }: { userKey?: string }) =>
  useInfiniteQuery({
    queryKey: storyQueryKeys.lists(userKey),
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams({
        first: String(PAGE_SIZE),
      });

      if (pageParam) {
        params.set('after', pageParam);
      }

      if (userKey) {
        params.set('user_key', userKey);
      }

      return fetcher.get<{
        stories: StoryResponse[];
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
