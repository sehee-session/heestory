import { useForm } from '@tanstack/react-form';
import { EyeIcon, PencilLineIcon, SaveIcon } from 'lucide-react';
import React from 'react';
import { data, useFetcher, useNavigate } from 'react-router';
import { CREATE_STORY, StoryDetail, StoryForm } from '~/entities/story';
import { createGraphqlClient } from '~/shared/api';
import { requireAuth } from '~/shared/auth';
import { PATHS } from '~/shared/constants';
import { useToggle } from '~/shared/hooks';
import { cloudflareContext } from '~/shared/lib';
import { toast } from '~/shared/lib/toast';
import { supabaseContext } from '~/shared/supabase';
import { Button } from '~/shared/ui';
import { Header } from '~/widgets/header';
import type { Route } from './+types/write-story';

export const meta = [
  { title: `Write Story` },
  { name: 'description', content: `Write your Development Story.` },
];

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const user = requireAuth(request, context);

  return { user };
};

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
    return data(
      { error: '인증 세션을 확인할 수 없습니다.' },
      { status: 401 },
    );
  }

  const { env } = context.get(cloudflareContext);

  const client = createGraphqlClient({
    url: env.SUPABASE_URL,
    apiKey: env.SUPABASE_PUBLISHABLE_KEY,
    accessToken: session.access_token,
  });

  const { title, content } = (await request.json()) as {
    title: string;
    content: string;
  };

  if (title.length === 0) {
    return data({ error: '제목을 입력해주세요.' }, { status: 400 });
  }

  const result = await client.request(CREATE_STORY, { title, content });

  const storyId = result.insertIntostoriesCollection.records[0]?.id;

  if (!storyId) {
    return data(
      { error: '스토리 저장 결과를 확인할 수 없습니다.' },
      { status: 500 },
    );
  }

  return data({
    success: true,
    storyId,
  });
};

const Page = () => {
  const [preview, onTogglePreview] = useToggle();
  const form = useForm({
    defaultValues: { title: '', content: '' },
    onSubmit: async ({ value }) => {
      fetcher.submit(
        { title: value.title.trim(), content: value.content.trim() },
        { method: 'post', encType: 'application/json' },
      );
    },
  });
  const fetcher = useFetcher();
  const navigate = useNavigate();

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

    toast.success('스토리가 저장되었습니다.');
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
          id={''}
          summary={''}
          thumbnailUrl=""
          title={form.state.values.title}
          createdAt={new Date().toISOString()}
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
