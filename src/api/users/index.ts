import { data } from 'react-router';
import { createUserRepository, USER_ERROR } from '~/entities/user';
import { cloudflareContext } from '~/shared/lib';
import type { Route } from './+types';

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const username = url.searchParams.get('username');

  if (!username) {
    return data(USER_ERROR.USERNAME_REQUIRED.message, {
      status: USER_ERROR.USERNAME_REQUIRED.status,
    });
  }

  const { env } = context.get(cloudflareContext);

  const userRepository = createUserRepository({
    url: env.SUPABASE_URL,
    apiKey: env.SUPABASE_PUBLISHABLE_KEY,
  });

  const user = await userRepository.fetchUser(username);

  if (!user) {
    return data(USER_ERROR.NOT_FOUND.message, {
      status: USER_ERROR.NOT_FOUND.status,
    });
  }

  return data(user);
};
