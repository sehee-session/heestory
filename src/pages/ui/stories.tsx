import { Tabs } from '@base-ui/react/tabs';
import { RssIcon } from 'lucide-react';
import { StoryCard } from '~/entities/story';
import { UserAuthor } from '~/entities/user';
import { SignOutForm } from '~/features/auth';
import { Header } from '~/widgets/header';
import { stories } from '../lib/mock.stories';
import * as styles from './stories.css';
import { WriteStoryNavigationButton } from './write-story-navigation';

export const meta = () => [
  { title: 'Stories | Seehistory' },
  {
    name: 'description',
    content: 'Explore developer stories and experiences.',
  },
];

const TAB = {
  LATEST: 'latest',
} as const;

const tabs = [{ label: 'Latest', value: TAB.LATEST, Icon: RssIcon }];

const Page = () => {
  return (
    <main>
      <Header
        text="stories"
        actions={[
          <WriteStoryNavigationButton key="write" />,
          <SignOutForm key="sign-out" />,
        ]}
      />
      <Tabs.Root className={styles.root} value={TAB.LATEST}>
        <Tabs.List className={styles.list}>
          {tabs.map(({ label, value, Icon }) => (
            <Tabs.Tab key={value} className={styles.tab} value={value}>
              {<Icon size={16} />} {label}
            </Tabs.Tab>
          ))}
          <Tabs.Indicator className={styles.indicator} />
        </Tabs.List>
        <Tabs.Panel className={styles.panel} value={TAB.LATEST}>
          {stories.map((story) => (
            <article key={story.id} className={styles.panelItem}>
              <UserAuthor {...story.author} />
              <StoryCard {...story} />
            </article>
          ))}
        </Tabs.Panel>
      </Tabs.Root>
    </main>
  );
};

export default Page;
