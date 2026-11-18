import { LogOutIcon } from 'lucide-react';
import { useAuth } from '~/shared/hooks';
import { Button } from '~/shared/ui';

export const SignOutForm = () => {
  const { isAuthenticated } = useAuth();

  return (
    isAuthenticated && (
      <form method="post" action="/api/auth/sign-out">
        <Button variant="icon" type="submit" aria-label="로그아웃">
          <LogOutIcon />
        </Button>
      </form>
    )
  );
};
