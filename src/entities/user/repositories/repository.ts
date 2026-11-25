import { createRepository } from '~/shared/api';
import { userResponseAdapter } from '../lib/user-response-adapter';
import type { UserResponse } from '../model/response';
import { FETCH_USER_BY_USERNAME_GQL } from './fetch-user-gql';
import { SYNC_USER_PROFILE_GQL } from './sync-profile-gql';

export const createUserRepository = createRepository((request) => ({
  syncUserProfile: async (params: {
    username: string | null;
    avatarUrl: string | null;
  }) => {
    const result = await request<{
      sync_user_profile: {
        id: string;
        username: string | null;
        avatar_url: string | null;
        updated_at: string;
      };
    }>(SYNC_USER_PROFILE_GQL, params);

    return result.sync_user_profile;
  },
  fetchUser: async (username: string) => {
    const result = await request<{
      user_profilesCollection: {
        edges: { node: UserResponse }[];
      } | null;
    }>(FETCH_USER_BY_USERNAME_GQL, { filter: { username: { eq: username } } });

    const user = result.user_profilesCollection?.edges?.at(0)?.node;
    return user ? userResponseAdapter(user) : null;
  },
}));
