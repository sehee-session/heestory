import { createGraphqlClient } from '~/shared/api';
import type { CreateStorySchema } from '../model/create-story-schema';
import type { GetStoryQuery, Story } from '../model/types';
import type { UpdateStorySchema } from '../model/update-story-schema';
import { CREATE_STORY } from './create-story';
import { GET_STORY } from './fetch-story';
import { MODIFY_STORY } from './modify-story';

type StoryRepositoryConfig = {
  url: string;
  apiKey: string;
  accessToken?: string;
};

export const createStoryRepository = ({
  url,
  apiKey,
  accessToken,
}: StoryRepositoryConfig) => {
  const client = createGraphqlClient({ url, apiKey, accessToken });

  return {
    getStoryById: async (id?: string) => {
      const result = await client.request<GetStoryQuery>(GET_STORY, { id });

      return result.storiesCollection?.edges[0]?.node ?? null;
    },

    createStory: async ({ title, content }: CreateStorySchema) => {
      const result = await client.request<{
        insertIntostoriesCollection: { records: Story[] };
      }>(CREATE_STORY, { title, content });

      return result.insertIntostoriesCollection.records[0] ?? null;
    },

    modifyStory: async ({ id, title, content }: UpdateStorySchema) => {
      const result = await client.request<{
        updateIntostoriesCollection: { records: Story[] };
      }>(MODIFY_STORY, { id, title, content });

      return result.updateIntostoriesCollection.records[0] ?? null;
    },
  };
};
