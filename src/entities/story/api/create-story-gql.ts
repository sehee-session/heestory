import { gql } from 'graphql-request';

export const CREATE_STORY_GQL = gql`
  mutation CreateStory($title: String!, $content: String!) {
    insertIntostoriesCollection(
      objects: [{ title: $title, content: $content }]
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
