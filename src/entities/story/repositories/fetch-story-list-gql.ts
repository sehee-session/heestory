import { gql } from 'graphql-request';

export const GET_STORY_LIST_GQL = gql`
  query GetStoryList($first: Int!, $after: Cursor, $filter: StoriesFilter) {
    storiesCollection(
      first: $first
      after: $after
      filter: $filter
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

          userProfile: user_profiles {
            id
            username
            avatarUrl: avatar_url
          }

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
