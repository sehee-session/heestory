import { data, useLoaderData } from 'react-router';
import {
  createUserRepository,
  USER_ERROR,
  UserInfo,
  userResponseAdapter,
} from '~/entities/user';
import { SignOutForm } from '~/features/auth';
import { cloudflareContext } from '~/shared/lib';
import { Header } from '~/widgets/header';
import { InfiniteStoryList } from '~/widgets/story-list';
import type { Route } from './+types/user';
import * as styles from './user.css';
import { WriteStoryNavigationButton } from './write-story-navigation';

export const meta = ({ params }: Route.MetaArgs) => [
  { title: `${params.username}'s history` },
  {
    name: 'description',
    content: `Explore ${params.username}'s developer stories and experiences.`,
  },
];

export const loader = async ({ params, context }: Route.LoaderArgs) => {
  const { env } = context.get(cloudflareContext);

  const userRepository = createUserRepository({
    url: env.SUPABASE_URL,
    apiKey: env.SUPABASE_PUBLISHABLE_KEY,
  });

  const { username } = params;

  if (!username) {
    throw data(USER_ERROR.USERNAME_REQUIRED.message, {
      status: USER_ERROR.USERNAME_REQUIRED.status,
    });
  }

  const user = await userRepository.fetchUser(username);

  if (!user) {
    throw data(USER_ERROR.NOT_FOUND.message, {
      status: USER_ERROR.NOT_FOUND.status,
    });
  }

  return { user: userResponseAdapter(user) };
};

const Page = ({ params }: Route.ComponentProps) => {
  const { user } = useLoaderData();

  return (
    <>
      <Header
        text={`${params.username}`}
        actions={[
          <WriteStoryNavigationButton key="write" />,
          <SignOutForm key="sign-out" />,
        ]}
      />
      <UserInfo {...user} />
      <div className={styles.list}>
        <InfiniteStoryList userKey={user.id} />
      </div>
    </>
  );
};

export default Page;
