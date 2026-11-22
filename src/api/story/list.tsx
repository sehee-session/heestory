import { data } from 'react-router';
import { createStoryRepository } from '~/entities/story';
import { requireAuth } from '~/shared/auth';
import { cloudflareContext } from '~/shared/lib';
import { supabaseContext } from '~/shared/supabase';
import type { Route } from './+types/list';

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  requireAuth(request, context);

  const supabase = context.get(supabaseContext);

  if (!supabase) {
    return data({ error: '인증 정보를 찾을 수 없습니다.' }, { status: 500 });
  }

  const url = new URL(request.url);
  const first = Number(url.searchParams.get('first') ?? 10);
  const after = url.searchParams.get('after');

  const { env } = context.get(cloudflareContext);

  const storyRepository = createStoryRepository({
    url: env.SUPABASE_URL,
    apiKey: env.SUPABASE_PUBLISHABLE_KEY,
  });

  const result = await storyRepository.getStoryList({ first, after });

  return data(result);
};
