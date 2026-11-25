export type StoryAuthorResponse = {
  id: string;
  username: string;
  avatar_url: string | null;
};

export type StoryResponse = {
  id: string;
  thumbnail_url: string | null;
  title: string;
  summary: string;
  content: string;

  user_key: string;
  user_profiles: StoryAuthorResponse | null;

  created_at: string;
  updated_at: string;
};
