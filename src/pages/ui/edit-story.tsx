import { useForm } from '@tanstack/react-form';
import { EyeIcon, PencilLineIcon, SaveIcon } from 'lucide-react';
import React from 'react';
import { data, useFetcher, useLoaderData, useNavigate } from 'react-router';
import {
  createStoryRepository,
  StoryDetail,
  StoryForm,
  updateStorySchema,
} from '~/entities/story';
import { requireAuth } from '~/shared/auth';
import { PATHS } from '~/shared/constants/paths';
import { useToggle } from '~/shared/hooks';
import { cloudflareContext } from '~/shared/lib/cloudflare';
import { toast } from '~/shared/lib/toast';
import { supabaseContext } from '~/shared/supabase';
import { Button } from '~/shared/ui';
import { Header } from '~/widgets/header';
import type { Route } from './+types/edit-story';

export const meta = [
  { title: `Edit Story` },
  { name: 'description', content: `Edit your Development Story.` },
];

export const loader = async ({
  request,
  context,
  params,
}: Route.LoaderArgs) => {
  const user = requireAuth(request, context);

  const { env } = context.get(cloudflareContext);

  const { id } = params;

  if (!id) {
    throw data('스토리 ID가 필요합니다.', { status: 400 });
  }

  const storyRepository = createStoryRepository({
    url: env.SUPABASE_URL,
    apiKey: env.SUPABASE_PUBLISHABLE_KEY,
  });

  const story = await storyRepository.getStoryById(id);

  if (!story) {
    throw data('스토리를 찾을 수 없습니다.', { status: 404 });
  }

  if (story.user_key !== user.id) {
    throw data('수정 권한이 없습니다.', { status: 403 });
  }

  return { story, user };
};

export const action = async ({ request, context }: Route.ActionArgs) => {
  const user = requireAuth(request, context);

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

  if (user.id !== session.user.id) {
    return data({ error: '수정 권한이 없습니다.' }, { status: 403 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return data({ error: '잘못된 요청입니다.' }, { status: 400 });
  }

  const parsed = updateStorySchema.safeParse(body);

  if (!parsed.success) {
    return data({ error: '입력한 내용을 확인해주세요.' }, { status: 400 });
  }

  const { env } = context.get(cloudflareContext);

  const storyRepository = createStoryRepository({
    url: env.SUPABASE_URL,
    apiKey: env.SUPABASE_PUBLISHABLE_KEY,
    accessToken: session.access_token,
  });

  const result = await storyRepository.updateStory(parsed.data);

  if (!result?.id) {
    return data(
      { error: '스토리 저장 결과를 확인할 수 없습니다.' },
      { status: 500 },
    );
  }

  return data({ success: true, storyId: result.id });
};

const Page = () => {
  const { story } = useLoaderData<typeof loader>();
  const [preview, onTogglePreview] = useToggle();

  const fetcher = useFetcher();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: { title: story?.title ?? '', content: story?.content ?? '' },
    onSubmit: async ({ value }) => {
      fetcher.submit(
        {
          id: story.id,
          title: value.title.trim(),
          content: value.content.trim(),
        },
        {
          method: 'POST',
          encType: 'application/json',
        },
      );
    },
  });

  React.useEffect(() => {
    if (fetcher.state !== 'idle' || !fetcher.data) {
      return;
    }

    if (fetcher.data.error) {
      toast.error(fetcher.data.error);
      return;
    }

    if (!fetcher.data.success) {
      return;
    }

    toast.success('스토리가 수정되었습니다.');
    navigate(PATHS.STORY.DETAIL(fetcher.data.storyId));
  }, [fetcher.state, fetcher.data, navigate]);

  return (
    <>
      <Header
        text={preview ? 'preview' : 'compose'}
        actions={[
          <Button
            key="preview"
            title="preview"
            variant="icon"
            aria-label="미리보기"
            onClick={onTogglePreview}
          >
            {preview ? <PencilLineIcon /> : <EyeIcon />}
          </Button>,
          <Button
            key="save"
            title="save"
            variant="icon"
            aria-label="저장"
            onClick={() => form.handleSubmit()}
            disabled={fetcher.state !== 'idle'}
          >
            <SaveIcon />
          </Button>,
        ]}
      />
      {preview ? (
        <StoryDetail
          id={story?.id ?? ''}
          summary={story?.summary ?? ''}
          thumbnailUrl={story?.thumbnailUrl ?? ''}
          title={form.state.values.title}
          createdAt={story?.createdAt ?? ''}
          updatedAt={new Date().toISOString()}
          content={form.state.values.content}
        />
      ) : (
        <StoryForm form={form} />
      )}
    </>
  );
};

export default Page;
