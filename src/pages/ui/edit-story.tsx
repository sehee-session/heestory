import { useForm } from '@tanstack/react-form';
import { EyeIcon, PencilLineIcon, SaveIcon } from 'lucide-react';
import { StoryDetail, StoryForm } from '~/entities/story';
import { requireAuth } from '~/shared/auth';
import { useToggle } from '~/shared/hooks';
import { Button } from '~/shared/ui';
import { Header } from '~/widgets/header';
import type { Route } from './+types/edit-story';

export const meta = [
  { title: `Edit Story` },
  { name: 'description', content: `Edit your Development Story.` },
];

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const user = requireAuth(request, context);

  return { user };
};

const Page = () => {
  const [preview, onTogglePreview] = useToggle();
  const form = useForm({
    defaultValues: { title: '', content: '' },
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
