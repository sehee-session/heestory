import { gql } from 'graphql-request';

export const UPDATE_STORY_GQL = gql`
  mutation UpdateStory(
    $id: UUID!
    $userKey: UUID!
    $title: String!
    $content: String!
  ) {
    updatestoriesCollection(
      filter: { id: { eq: $id }, user_key: { eq: $userKey } }
      set: { title: $title, content: $content }
    ) {
      records {
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
`;
