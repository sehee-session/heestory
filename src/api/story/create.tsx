import { data } from 'react-router';
import { createStoryRepository, createStorySchema } from '~/entities/story';
import { requireAuth } from '~/shared/auth';
import { cloudflareContext } from '~/shared/lib';
import { supabaseContext } from '~/shared/supabase';
import type { Route } from './+types/create';

export const action = async ({ request, context }: Route.ActionArgs) => {
  requireAuth(request, context);

  const supabase = context.get(supabaseContext);

  if (!supabase) {
    return data({ error: '인증 정보를 찾을 수 없습니다.' }, { status: 500 });
  }

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    return data({ error: '인증 세션을 확인할 수 없습니다.' }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return data({ error: '잘못된 요청입니다.' }, { status: 400 });
  }

  const parsed = createStorySchema.safeParse(body);

  if (!parsed.success) {
    return data({ error: '입력한 내용을 확인해주세요.' }, { status: 400 });
  }

  const { env } = context.get(cloudflareContext);

  const storyRepository = createStoryRepository({
    url: env.SUPABASE_URL,
    apiKey: env.SUPABASE_PUBLISHABLE_KEY,
    accessToken: session.access_token,
  });

  const result = await storyRepository.createStory(parsed.data);

  if (!result?.id) {
    return data(
      { error: '스토리 저장 결과를 확인할 수 없습니다.' },
      { status: 500 },
    );
  }

  return data({ success: true, storyId: result.id });
};
