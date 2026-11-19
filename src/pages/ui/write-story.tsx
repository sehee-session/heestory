import { useForm } from '@tanstack/react-form';
import { EyeIcon, PencilLineIcon, SaveIcon } from 'lucide-react';
import React from 'react';
import { data, useFetcher, useNavigate } from 'react-router';
import { CREATE_STORY, formatDate, StoryForm } from '~/entities/story';
import { createGraphqlClient } from '~/shared/api';
import { requireAuth } from '~/shared/auth';
import { PATHS } from '~/shared/constants';
import { useToggle } from '~/shared/hooks';
import { cloudflareContext } from '~/shared/lib';
import { toast } from '~/shared/lib/toast';
import { supabaseContext } from '~/shared/supabase';
import { Button, MarkdownToc, MarkdownViewer } from '~/shared/ui';
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
    throw data({ error: '인증 정보를 찾을 수 없습니다.' }, { status: 500 });
  }

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    throw data({ message: '인증 세션을 확인할 수 없습니다.' }, { status: 401 });
  }

  const { env } = context.get(cloudflareContext);

  const client = createGraphqlClient({
    url: env.SUPABASE_URL,
    apiKey: env.SUPABASE_PUBLISHABLE_KEY,
    accessToken: session.access_token,
  });

  const { title, content } = await request.json<{
    title: string;
    content: string;
  }>();

  const result = await client.request(CREATE_STORY, { title, content });

  const storyId = result.insertIntostoriesCollection.records[0]?.id;

  if (!storyId) {
    throw data(
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
        { title: value.title, content: value.content },
        { method: 'post', encType: 'application/json' },
      );
    },
  });
  const fetcher = useFetcher();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (fetcher.state !== 'idle' || !fetcher.data?.success) {
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
        <>
          <h1>{form.state.values.title}</h1>
          <time dateTime={new Date().toISOString()}>
            {formatDate(new Date().toISOString())}
          </time>
          <MarkdownViewer content={form.state.values.content} />
          <MarkdownToc content={form.state.values.content} />
        </>
      ) : (
        <StoryForm form={form} />
      )}
    </>
  );
};

export default Page;
