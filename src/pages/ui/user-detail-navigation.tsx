import { UserAvatar } from '~/entities/user';
import { PATHS } from '~/shared/constants';
import { useAuth } from '~/shared/hooks';
import { Button } from '~/shared/ui';

export const UserDetailNavigationButton = () => {
  const { isAuthenticated, user } = useAuth();
  const username = user?.user_metadata?.user_name;

  if (!isAuthenticated || !username) return null;

  return (
    <Button
      variant="icon"
      aria-label="내 페이지"
      to={PATHS.USERS.DETAIL(username)}
    >
      <UserAvatar
        username={username}
        avatarUrl={user.user_metadata?.avatar_url ?? ''}
      />
    </Button>
  );
};
