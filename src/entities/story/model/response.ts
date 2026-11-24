export type StoryAuthorResponse = {
  id: string;
  name: string;
  profile_url: string | null;
};

export type StoryResponse = {
  id: string;
  thumbnail_url: string | null;
  title: string;
  summary: string;
  content: string;

  user_key: string;
  user_profile: StoryAuthorResponse | null;

  created_at: string;
  updated_at: string;
};
