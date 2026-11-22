import { useForm } from '@tanstack/react-form';
import { EyeIcon, PencilLineIcon, SaveIcon } from 'lucide-react';
import React from 'react';
import { useFetcher, useNavigate } from 'react-router';
import { StoryDetail, StoryForm } from '~/entities/story';
import { requireAuth } from '~/shared/auth';
import { PATHS } from '~/shared/constants';
import { useToggle } from '~/shared/hooks';
import { toast } from '~/shared/lib/toast';
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
