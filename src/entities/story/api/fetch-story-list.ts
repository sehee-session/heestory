import { gql } from 'graphql-request';

export const GET_STORY_LIST_GQL = gql`
  query GetStoryList($first: Int!, $after: Cursor) {
    storiesCollection(
      first: $first
      after: $after
      orderBy: [{ created_at: DescNullsLast }, { id: DescNullsLast }]
    ) {
      edges {
        cursor
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
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
