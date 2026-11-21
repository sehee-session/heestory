import { gql } from 'graphql-request';

export const UPDATE_STORY = gql`
  mutation UpdateStory($id: UUID!, $title: String!, $content: String!) {
    updatestoriesCollection(
      filter: { id: { eq: $id } }
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
