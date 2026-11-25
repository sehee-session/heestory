import { createRepository } from '~/shared/api';
import type { UserResponse } from '../model/response';
import { FETCH_USER_BY_USERNAME_GQL } from './fetch-user-gql';
import { SYNC_USER_PROFILE_GQL } from './sync-profile-gql';
import { UPDATE_USER_INTRO_GQL } from './update-user-intro-gql';

export const createUserRepository = createRepository((request) => ({
  syncUserProfile: async (params: {
    username: string | null;
    avatarUrl: string | null;
  }) => {
    await request<{
      sync_user_profile: {
        id: string;
        username: string | null;
        avatar_url: string | null;
        updated_at: string;
      };
    }>(SYNC_USER_PROFILE_GQL, params);
  },
  fetchUser: async (username: string) => {
    const result = await request<{
      user_profilesCollection: {
        edges: { node: UserResponse }[];
      } | null;
    }>(FETCH_USER_BY_USERNAME_GQL, { filter: { username: { eq: username } } });

    return result.user_profilesCollection?.edges?.at(0)?.node;
  },
  editUserIntro: async (params: { intro: string; id: string }) => {
    const result = await request<{
      updateuser_profilesCollection: {
        records: { username: string }[];
      };
    }>(UPDATE_USER_INTRO_GQL, {
      userId: params.id,
      intro: params.intro,
    });
    return result.updateuser_profilesCollection.records?.at(0);
  },
}));
