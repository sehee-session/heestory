import { SignOutForm } from '~/entities/auth';
import { StoryCard } from '~/entities/story';
import { UserInfo } from '~/entities/user';
import { Header } from '~/widgets/header';
import { stories } from '../lib/mock.stories';
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
        {stories.map((story) => (
          <article key={story.id} className={styles.listItem}>
            <StoryCard {...story} />
          </article>
        ))}
      </div>
    </>
  );
};

export default Page;
