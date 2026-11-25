import { useRouteLoaderData } from 'react-router';
import { UserInfo } from '~/entities/user';
import { Header } from '~/widgets/header';
import type { Route } from './+types/edit-user';

const Page = ({ params }: Route.ComponentProps) => {
  const { user } = useRouteLoaderData('root');

  return (
    <>
      <Header text={`${params.username}/edit`} />
      <main>
        <UserInfo {...user} />
      </main>
    </>
  );
};

export default Page;
