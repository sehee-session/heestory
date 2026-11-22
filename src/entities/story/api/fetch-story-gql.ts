import { gql } from 'graphql-request';

export const GET_STORY_GQL = gql`
  query GetStory($id: UUID!) {
    storiesCollection(first: 1, filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          user_key
          title
          summary
          thumbnail_url
          content
          created_at
          updated_at
        }
      }
    }
  }
`;
