import { createGraphqlClient } from '~/shared/api';
import type {
  CreateStoryInput,
  GetStoryQuery,
  ModifyStoryInput,
  Story,
} from '../model/types';
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

    createStory: async ({ title, content }: CreateStoryInput) => {
      const result = await client.request<{
        insertIntostoriesCollection: { records: Story[] };
      }>(CREATE_STORY, { title, content });

      return result.insertIntostoriesCollection.records[0] ?? null;
    },

    modifyStory: async ({ id, title, content }: ModifyStoryInput) => {
      const result = await client.request<{
        updateIntostoriesCollection: { records: Story[] };
      }>(MODIFY_STORY, { id, title, content });

      return result.updateIntostoriesCollection.records[0] ?? null;
    },
  };
};
