import { createGraphqlClient } from '~/shared/api';
import type { GetStoryQuery } from '../model/types';
import { GET_STORY } from './fetch-story';

type StoryRepositoryConfig = {
  url: string;
  apiKey: string;
};

export const createStoryRepository = ({
  url,
  apiKey,
}: StoryRepositoryConfig) => {
  const client = createGraphqlClient({ url, apiKey });

  return {
    getStoryById: async (id?: string) => {
      const result = await client.request<GetStoryQuery>(GET_STORY, { id });

      return result.storiesCollection?.edges[0]?.node ?? null;
    },
  };
};
