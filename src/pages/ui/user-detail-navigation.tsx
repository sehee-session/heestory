import { UserAvatar } from '~/entities/user';
import { PATHS } from '~/shared/constants';
import { useAuth } from '~/shared/hooks';
import { Button } from '~/shared/ui';

export const UserDetailNavigationButton = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    isAuthenticated && (
      <Button
        variant="icon"
        aria-label="내 페이지"
        to={
          isAuthenticated
            ? PATHS.USERS.DETAIL(user?.user_metadata?.user_name ?? '')
            : PATHS.AUTH.SIGN_IN
        }
      >
        <UserAvatar
          username={user?.user_metadata?.user_name ?? ''}
          avatarUrl={user?.user_metadata?.avatar_url ?? ''}
        />
      </Button>
    )
  );
};
