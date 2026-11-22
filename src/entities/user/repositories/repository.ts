import { createGraphqlClient } from '~/shared/api';
import type {
  SyncUserProfileParams,
  SyncUserProfileResponse,
} from '../model/types';
import { SYNC_USER_PROFILE_GQL } from './sync-profile-gql';

type UserRepositoryConfig = {
  url: string;
  apiKey: string;
  accessToken?: string;
};

export const createUserRepository = ({
  apiKey,
  url,
  accessToken,
}: UserRepositoryConfig) => {
  const client = createGraphqlClient({ url, apiKey, accessToken });

  return {
    syncUserProfile: async ({ username, avatarUrl }: SyncUserProfileParams) => {
      const result = await client.request<SyncUserProfileResponse>(
        SYNC_USER_PROFILE_GQL,
        { username, avatarUrl },
      );

      return result.sync_user_profile;
    },
  };
};
