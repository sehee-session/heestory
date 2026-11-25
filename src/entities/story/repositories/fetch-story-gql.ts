import { gql } from 'graphql-request';

export const GET_STORY_GQL = gql`
  query GetStory($id: UUID!) {
    storiesCollection(first: 1, filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          title
          summary
          content

          user_key
          thumbnail_url

          user_profiles {
            id
            username
            avatar_url
          }

          created_at
          updated_at
        }
      }
    }
  }
`;
