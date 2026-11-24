import type { User } from '../model/entity';
import type { UserResponse } from '../model/response';

export const userResponseAdapter = (response: UserResponse | null): User => ({
  id: response?.id ?? '',
  username: response?.username ?? '',
  avatarUrl: response?.avatar_url ?? null,
  createdAt: response?.created_at ? new Date(response.created_at) : new Date(),
  updatedAt: response?.updated_at ? new Date(response.updated_at) : new Date(),
});
