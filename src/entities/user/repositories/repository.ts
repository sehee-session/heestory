import type { RepositoryConfig } from '~/shared/api';
import { createRepository } from '~/shared/api';
import type {
  SyncUserProfileParams,
  SyncUserProfileResponse,
} from '../model/types';
import { SYNC_USER_PROFILE_GQL } from './sync-profile-gql';

export const createUserRepository = (config: RepositoryConfig) => {
  const { request } = createRepository(config);

  return {
    syncUserProfile: async (params: SyncUserProfileParams) => {
      const result = await request<SyncUserProfileResponse>(
        SYNC_USER_PROFILE_GQL,
        params,
      );

      return result.sync_user_profile;
    },
  };
};
