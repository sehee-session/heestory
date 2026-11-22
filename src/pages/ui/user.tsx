import { UserInfo } from '~/entities/user';
import { SignOutForm } from '~/features/auth';
import { Header } from '~/widgets/header';
import { InfiniteStoryList } from '~/widgets/story-list';
import { user } from '../lib/mock.user';
import type { Route } from './+types/user';
import * as styles from './user.css';
import { WriteStoryNavigationButton } from './write-story-navigation';

export const meta = ({ params }: Route.MetaArgs) => [
  { title: `${params.id}'s history` },
  {
    name: 'description',
    content: `Explore ${params.id}'s developer stories and experiences.`,
  },
];

const Page = ({ params }: Route.ComponentProps) => {
  const { id } = params;

  return (
    <>
      <Header
        text={`${id}`}
        actions={[
          <WriteStoryNavigationButton key="write" />,
          <SignOutForm key="sign-out" />,
        ]}
      />
      <UserInfo {...user} />
      <div className={styles.list}>
        <InfiniteStoryList />
      </div>
    </>
  );
};

export default Page;
