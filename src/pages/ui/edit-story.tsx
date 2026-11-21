import { useForm } from '@tanstack/react-form';
import { EyeIcon, PencilLineIcon, SaveIcon } from 'lucide-react';
import { data, useLoaderData } from 'react-router';
import {
  GET_STORY,
  StoryDetail,
  StoryForm,
  type GetStoryQuery,
} from '~/entities/story';
import { createGraphqlClient } from '~/shared/api/graphql';
import { requireAuth } from '~/shared/auth';
import { useToggle } from '~/shared/hooks';
import { cloudflareContext } from '~/shared/lib/cloudflare';
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

  const client = createGraphqlClient({
    url: env.SUPABASE_URL,
    apiKey: env.SUPABASE_PUBLISHABLE_KEY,
  });

  const result = await client.request<GetStoryQuery>(GET_STORY, { id });

  const story = result.storiesCollection?.edges[0]?.node;

  if (!story) {
    throw data('스토리를 찾을 수 없습니다.', { status: 404 });
  }

  if (story.user_key !== user.id) {
    throw data('수정 권한이 없습니다.', { status: 403 });
  }

  return { story, user };
};

const Page = () => {
  const { story } = useLoaderData<typeof loader>();
  const [preview, onTogglePreview] = useToggle();
  const form = useForm({
    defaultValues: { title: story?.title ?? '', content: story?.content ?? '' },
  });

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
          <Button key="save" title="save" variant="icon" aria-label="저장">
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
