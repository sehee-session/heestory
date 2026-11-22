import { useForm } from '@tanstack/react-form';
import { EyeIcon, PencilLineIcon, SaveIcon } from 'lucide-react';
import { data, useLoaderData, useNavigate } from 'react-router';
import {
  createStoryRepository,
  STORY_ERROR,
  STORY_TOAST_MESSAGE,
  StoryDetail,
  StoryForm,
  useEditStory,
} from '~/entities/story';
import { requireAuth } from '~/shared/auth';
import { COMMON_ERROR } from '~/shared/constants';
import { PATHS } from '~/shared/constants/paths';
import { useToggle } from '~/shared/hooks';
import { cloudflareContext } from '~/shared/lib/cloudflare';
import { toast } from '~/shared/lib/toast';
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
    throw data(STORY_ERROR.ID_REQUIRED.message, {
      status: STORY_ERROR.ID_REQUIRED.status,
    });
  }

  const storyRepository = createStoryRepository({
    url: env.SUPABASE_URL,
    apiKey: env.SUPABASE_PUBLISHABLE_KEY,
  });

  const story = await storyRepository.getStoryById(id);

  if (!story) {
    throw data(STORY_ERROR.NOT_FOUND.message, {
      status: STORY_ERROR.NOT_FOUND.status,
    });
  }

  if (story.userKey !== user.id) {
    throw data(COMMON_ERROR.FORBIDDEN.message, {
      status: COMMON_ERROR.FORBIDDEN.status,
    });
  }

  return { story, user };
};

const Page = () => {
  const { story, user } = useLoaderData<typeof loader>();
  const [preview, onTogglePreview] = useToggle();
  const mutation = useEditStory();

  const navigate = useNavigate();
  const form = useForm({
    defaultValues: { title: story?.title ?? '', content: story?.content ?? '' },
    onSubmit: async ({ value }) => {
      const result = await mutation.mutateAsync({
        id: story.id,
        title: value.title.trim(),
        content: value.content.trim(),
        userKey: user.id,
      });
      toast.success(STORY_TOAST_MESSAGE.EDIT_SUCCESS);
      navigate(PATHS.STORY.DETAIL(result.storyId));
    },
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
