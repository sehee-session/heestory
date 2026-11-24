import { createRepository } from '~/shared/api';
import type {
  SyncUserProfileParams,
  SyncUserProfileResponse,
} from '../model/types';
import { FETCH_USER_BY_USERNAME_GQL } from './fetch-user-gql';
import { SYNC_USER_PROFILE_GQL } from './sync-profile-gql';

export const createUserRepository = createRepository((request) => ({
  syncUserProfile: async (params: SyncUserProfileParams) => {
    const result = await request<SyncUserProfileResponse>(
      SYNC_USER_PROFILE_GQL,
      params,
    );

    return result.sync_user_profile;
  },
  fetchUser: async (username: string) => {
    const result = await request<{
      user_profilesCollection: {
        edges: { node: { id: string; username: string; avatar_url: string } }[];
      } | null;
    }>(FETCH_USER_BY_USERNAME_GQL, { filter: { username: { eq: username } } });

    return result.user_profilesCollection?.edges[0]?.node ?? null;
  },
}));
