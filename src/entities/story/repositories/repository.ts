import { createRepository } from '~/shared/api';
import type { CreateStorySchema } from '../model/create-story-schema';
import type { StoryResponse } from '../model/response';
import type { UpdateStorySchema } from '../model/update-story-schema';
import { CREATE_STORY_GQL } from './create-story-gql';
import { GET_STORY_GQL } from './fetch-story-gql';
import { GET_STORY_LIST_GQL } from './fetch-story-list-gql';
import { UPDATE_STORY_GQL } from './update-story-gql';

export const createStoryRepository = createRepository((request) => ({
  getStoryById: async (id?: string) => {
    const result = await request<{
      storiesCollection: { edges: { node: StoryResponse }[] } | null;
    }>(GET_STORY_GQL, { id });

    return result.storiesCollection?.edges?.at(0)?.node;
  },

  getStoryList: async ({
    first = 10,
    after = null,
    userKey,
  }: {
    first?: number;
    after?: string | null;
    userKey?: string | null;
  }) => {
    const result = await request<{
      storiesCollection: {
        edges: { node: StoryResponse }[];
        pageInfo: { endCursor: string | null; hasNextPage: boolean };
      };
    }>(GET_STORY_LIST_GQL, {
      first,
      after,
      filter: userKey ? { user_key: { eq: userKey } } : null,
    });

    return {
      stories: result.storiesCollection.edges.map(({ node }) => node),
      nextCursor: result.storiesCollection.pageInfo.endCursor,
      hasNextPage: result.storiesCollection.pageInfo.hasNextPage,
    };
  },

  createStory: async ({ title, content }: CreateStorySchema) => {
    const result = await request<{
      insertIntostoriesCollection: { records: StoryResponse[] };
    }>(CREATE_STORY_GQL, { title, content });

    return result.insertIntostoriesCollection.records[0];
  },

  updateStory: async ({ id, title, content, userKey }: UpdateStorySchema) => {
    const result = await request<{
      updatestoriesCollection: { records: StoryResponse[] };
    }>(UPDATE_STORY_GQL, { id, title, content, userKey });

    return result.updatestoriesCollection.records[0] ?? null;
  },
}));
