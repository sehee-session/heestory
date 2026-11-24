import type { Story } from '../model/entity';
import type { StoryResponse } from '../model/response';

export const storyResponseAdapter = (
  storyResponse: StoryResponse | null,
): Story => {
  return {
    id: storyResponse?.id ?? '',
    thumbnailUrl: storyResponse?.thumbnail_url ?? null,
    title: storyResponse?.title ?? '',
    summary: storyResponse?.summary ?? '',
    content: storyResponse?.content ?? '',
    userKey: storyResponse?.user_key ?? '',
    userProfile: storyResponse?.user_profile
      ? {
          id: storyResponse.user_profile.id,
          username: storyResponse.user_profile.name,
          avatarUrl: storyResponse.user_profile.profile_url,
        }
      : null,
    createdAt: storyResponse?.created_at
      ? new Date(storyResponse.created_at)
      : new Date(),
    updatedAt: storyResponse?.updated_at
      ? new Date(storyResponse.updated_at)
      : new Date(),
  };
};
