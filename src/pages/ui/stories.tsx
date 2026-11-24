import { SignOutForm } from '~/features/auth';
import { Icon, Tabs } from '~/shared/ui';
import { Header } from '~/widgets/header';
import { InfiniteStoryList } from '~/widgets/story-list';
import { WriteStoryNavigationButton } from './write-story-navigation';

export const meta = () => [
  { title: 'Stories | Seehistory' },
  {
    name: 'description',
    content: 'Explore developer stories and experiences.',
  },
];

const TAB = { LATEST: 'latest' } as const;

const tabs = [{ label: 'Latest', value: TAB.LATEST, icon: 'latest' }] as const;

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
      <Tabs.Root defaultValue={TAB.LATEST}>
        <Tabs.List>
          {tabs.map(({ label, value, icon }) => (
            <Tabs.Tab key={value} value={value}>
              {<Icon icon={icon} size={16} />} {label}
            </Tabs.Tab>
          ))}
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Panel value={TAB.LATEST}>
          <InfiniteStoryList />
        </Tabs.Panel>
      </Tabs.Root>
    </main>
  );
};

export default Page;
