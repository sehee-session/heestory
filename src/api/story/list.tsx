import { data } from 'react-router';
import { createStoryRepository } from '~/entities/story';
import { cloudflareContext } from '~/shared/lib';
import type { Route } from './+types/list';

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const requestedFirst = Number(url.searchParams.get('first') ?? 10);
  const first =
    Number.isInteger(requestedFirst) && requestedFirst >= 1
      ? Math.min(requestedFirst, 12)
      : 10;

  const after = url.searchParams.get('after');

  const { env } = context.get(cloudflareContext);

  const storyRepository = createStoryRepository({
    url: env.SUPABASE_URL,
    apiKey: env.SUPABASE_PUBLISHABLE_KEY,
  });

  const result = await storyRepository.getStoryList({ first, after });

  return data(result);
};
