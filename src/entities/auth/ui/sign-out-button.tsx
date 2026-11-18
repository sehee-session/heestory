import { LogOutIcon } from 'lucide-react';
import { Button } from '~/shared/ui';

export const SignOutButton = () => (
  <form method="post" action="/api/auth/sign-out">
    <Button variant="icon" type="submit" aria-label="로그아웃">
      <LogOutIcon />
    </Button>
  </form>
);
