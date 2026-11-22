export type Story = {
  id: string;
  thumbnailUrl: string | null;
  title: string;
  summary: string;
  content: string;
  userKey: string;

  createdAt: string;
  updatedAt: string;
};
