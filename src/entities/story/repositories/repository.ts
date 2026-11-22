import { createRepository, type RepositoryConfig } from '~/shared/api';
import type { CreateStorySchema } from '../model/create-story-schema';
import type { Story } from '../model/types';
import type { UpdateStorySchema } from '../model/update-story-schema';
import { CREATE_STORY_GQL } from './create-story-gql';
import { GET_STORY_GQL } from './fetch-story-gql';
import { GET_STORY_LIST_GQL } from './fetch-story-list-gql';
import { UPDATE_STORY_GQL } from './update-story-gql';

export const createStoryRepository = (config: RepositoryConfig) => {
  const { request } = createRepository(config);

  return {
    getStoryById: async (id?: string) => {
      const result = await request<{
        storiesCollection: { edges: { node: Story }[] } | null;
      }>(GET_STORY_GQL, { id });

      return result.storiesCollection?.edges[0]?.node ?? null;
    },

    getStoryList: async ({
      first = 10,
      after = null,
    }: {
      first?: number;
      after?: string | null;
    }) => {
      const result = await request<{
        storiesCollection: {
          edges: { node: Story }[];
          pageInfo: { endCursor: string | null; hasNextPage: boolean };
        };
      }>(GET_STORY_LIST_GQL, { first, after });

      return {
        stories: result.storiesCollection.edges.map(({ node }) => node),
        nextCursor: result.storiesCollection.pageInfo.endCursor,
        hasNextPage: result.storiesCollection.pageInfo.hasNextPage,
      };
    },

    createStory: async ({ title, content }: CreateStorySchema) => {
      const result = await request<{
        insertIntostoriesCollection: { records: Story[] };
      }>(CREATE_STORY_GQL, { title, content });

      return result.insertIntostoriesCollection.records[0] ?? null;
    },

    updateStory: async ({ id, title, content, userKey }: UpdateStorySchema) => {
      const result = await request<{
        updatestoriesCollection: { records: Story[] };
      }>(UPDATE_STORY_GQL, { id, title, content, userKey });

      return result.updatestoriesCollection.records[0] ?? null;
    },
  };
};
