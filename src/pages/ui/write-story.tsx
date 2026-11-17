import { useForm } from '@tanstack/react-form';
import { EyeIcon, PencilLineIcon, SaveIcon } from 'lucide-react';
import { formatDate, StoryForm } from '~/entities/story';
import { requireAuth } from '~/shared/auth';
import { useToggle } from '~/shared/hooks';
import { Button, MarkdownToc, MarkdownViewer } from '~/shared/ui';
import { Header } from '~/widgets/header';
import type { Route } from './+types/write-story';

export const meta = [
  { title: `Write Story` },
  {
    name: 'description',
    content: `Write your Development Story.`,
  },
];

export const loader = async ({ context }: Route.LoaderArgs) => {
  const user = requireAuth(context);

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
            onClick={onTogglePreview}
          >
            {preview ? <PencilLineIcon /> : <EyeIcon />}
          </Button>,
          <Button key="save" title="save" variant="icon">
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
