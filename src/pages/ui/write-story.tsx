import { useForm } from '@tanstack/react-form';
import { EyeIcon, PencilLineIcon, SaveIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { StoryDetail, StoryForm, useWriteStory } from '~/entities/story';
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
  const mutation = useWriteStory();
  const form = useForm({
    defaultValues: { title: '', content: '' },
    onSubmit: async ({ value }) => {
      try {
        const story = await mutation.mutateAsync({
          title: value.title.trim(),
          content: value.content.trim(),
        });
        toast.success('스토리가 저장되었습니다.');
        navigate(PATHS.STORY.DETAIL(story.storyId));
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : '스토리를 저장하지 못했습니다.',
        );
      }
    },
  });
  const navigate = useNavigate();

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
            disabled={mutation.isPending}
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
