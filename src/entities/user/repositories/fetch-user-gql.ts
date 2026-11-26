import { gql } from 'graphql-request';

export const FETCH_USER_BY_USERNAME_GQL = gql`
  query FetchUserByUsername($filter: UserProfilesFilter) {
    user_profilesCollection(filter: $filter) {
      edges {
        node {
          id
          username
          avatar_url
          created_at
          updated_at
          intro
        }
      }
    }
  }
`;
