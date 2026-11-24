import { PATHS } from '~/shared/constants';
import { useAuth } from '~/shared/hooks';
import { Button, Icon } from '~/shared/ui';

export const WriteStoryNavigationButton = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Button
      variant="icon"
      aria-label="글쓰기"
      to={isAuthenticated ? PATHS.STORY.WRITE : PATHS.AUTH.SIGN_IN}
    >
      <Icon icon="write" />
    </Button>
  );
};
