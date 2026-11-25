import { useInfiniteQuery } from '@tanstack/react-query';
import { fetcher } from '~/shared/api';
import { API_PATHS } from '~/shared/constants';
import type { Story } from '../model/entity';
import { storyQueryKeys } from '../model/query-keys';

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
