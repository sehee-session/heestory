import { gql } from 'graphql-request';

export const SYNC_USER_PROFILE_GQL = gql`
  mutation SyncUserProfile($username: String, $avatarUrl: String) {
    sync_user_profile(p_username: $username, p_avatar_url: $avatarUrl) {
      id
      username
      avatar_url
      updated_at
    }
  }
`;
