export type Story = {
  id: string;
  thumbnailUrl: string | null;
  title: string;
  summary: string;
  content: string;
  user_key: string;

  createdAt: string;
  updatedAt: string;
};

export type GetStoryQuery = {
  storiesCollection: {
    edges: {
      node: Story;
    }[];
  } | null;
};
