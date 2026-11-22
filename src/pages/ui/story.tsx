import { data, useLoaderData } from 'react-router';
import {
  createStoryRepository,
  STORY_ERROR,
  StoryDetail,
} from '~/entities/story';
import { UserInfo } from '~/entities/user';
import { SignOutForm } from '~/features/auth';
import { cloudflareContext } from '~/shared/lib/cloudflare';
import { MarkdownToc } from '~/shared/ui';
import { Header } from '~/widgets/header';
import type { Route } from './+types/story';
import { WriteStoryNavigationButton } from './write-story-navigation';

export const meta = () => [
  { title: '' },
  {
    name: 'description',
    content: 'Explore developer stories and experiences.',
  },
];

export const loader = async ({ params, context }: Route.LoaderArgs) => {
  const { env } = context.get(cloudflareContext);

  const storyRepository = createStoryRepository({
    url: env.SUPABASE_URL,
    apiKey: env.SUPABASE_PUBLISHABLE_KEY,
  });

  const { id } = params;

  if (!id) {
    throw data(STORY_ERROR.ID_REQUIRED.message, {
      status: STORY_ERROR.ID_REQUIRED.status,
    });
  }

  const story = await storyRepository.getStoryById(id);

  if (!story) {
    throw data(STORY_ERROR.NOT_FOUND.message, {
      status: STORY_ERROR.NOT_FOUND.status,
    });
  }

  return { story };
};

const Page = () => {
  const { story } = useLoaderData<typeof loader>();

  return (
    <>
      <Header
        text="stories"
        actions={[
          <WriteStoryNavigationButton key="write" />,
          <SignOutForm key="sign-out" />,
        ]}
      />
      <StoryDetail {...story} />
      <MarkdownToc {...story} />
      {story.userProfile && <UserInfo {...story.userProfile} />}
    </>
  );
};

export default Page;
