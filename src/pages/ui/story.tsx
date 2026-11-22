import { data, useLoaderData } from 'react-router';
import { createStoryRepository, StoryDetail } from '~/entities/story';
import { UserInfo } from '~/entities/user';
import { SignOutForm } from '~/features/auth';
import { cloudflareContext } from '~/shared/lib/cloudflare';
import { MarkdownToc } from '~/shared/ui';
import { Header } from '~/widgets/header';
import { user } from '../lib/mock.user';
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
    throw data('스토리 ID가 필요합니다.', { status: 400 });
  }

  const story = await storyRepository.getStoryById(id);

  if (!story) {
    throw data('스토리를 찾을 수 없습니다.', { status: 404 });
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
      <UserInfo {...user} />
    </>
  );
};

export default Page;
