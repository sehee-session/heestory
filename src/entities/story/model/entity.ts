export type StoryAuthor = {
  username: string;
  avatarUrl: string | null;
  id: string;
};

export type Story = {
  id: string;
  thumbnailUrl: string | null;
  title: string;
  summary: string;
  content: string;

  userKey: string;
  userProfiles: StoryAuthor | null;

  createdAt: Date;
  updatedAt: Date;
};
