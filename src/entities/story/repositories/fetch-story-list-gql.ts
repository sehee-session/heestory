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
          thumbnail_url
          user_key

          user_profiles {
            id
            username
            avatar_url
          }

          created_at
          updated_at
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
