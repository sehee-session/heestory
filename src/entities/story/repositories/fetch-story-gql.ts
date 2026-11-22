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

          userKey: user_key
          thumbnailUrl: thumbnail_url

          userProfile: user_profiles {
            id
            username
            avatarUrl: avatar_url
          }

          createdAt: created_at
          updatedAt: updated_at
        }
      }
    }
  }
`;
