export type User = {
  id: string;
  username: string;
  avatarUrl: string | null;
};

export type SyncUserProfileParams = {
  username: string | null;
  avatarUrl: string | null;
};

export type SyncUserProfileResponse = {
  sync_user_profile: {
    id: string;
    username: string | null;
    avatar_url: string | null;
    updated_at: string;
  };
};
