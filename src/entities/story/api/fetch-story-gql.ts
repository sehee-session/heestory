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
          thumbnailUrl: thumbnail_url

          userKey: user_key

          createdAt: created_at
          updatedAt: updated_at
        }
      }
    }
  }
`;
