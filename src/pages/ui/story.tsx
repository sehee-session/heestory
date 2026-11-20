import { StoryDetail } from '~/entities/story';
import { UserInfo } from '~/entities/user';
import { SignOutForm } from '~/features/auth';
import { MarkdownToc } from '~/shared/ui';
import { Header } from '~/widgets/header';
import { story } from '../lib/mock.story';
import { user } from '../lib/mock.user';
import { WriteStoryNavigationButton } from './write-story-navigation';

export const meta = () => [
  { title: '' },
  {
    name: 'description',
    content: 'Explore developer stories and experiences.',
  },
];

const Page = () => {
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
