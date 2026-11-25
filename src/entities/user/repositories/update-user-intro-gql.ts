import { gql } from 'graphql-request';

export const UPDATE_USER_INTRO_GQL = gql`
  mutation UpdateUserIntro($userId: UUID!, $intro: String!) {
    updateuser_profilesCollection(
      filter: { id: { eq: $userId } }
      set: { intro: $intro }
    ) {
      records {
        username
      }
    }
  }
`;
