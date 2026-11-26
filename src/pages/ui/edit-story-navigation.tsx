import { PATHS } from '~/shared/constants';
import { useAuth } from '~/shared/hooks';
import { Button, Icon } from '~/shared/ui';

export const EditStoryNavigationButton = ({ id }: { id: string }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Button
      variant="icon"
      aria-label="글 수정하기"
      to={isAuthenticated ? PATHS.STORY.EDIT(id) : PATHS.AUTH.SIGN_IN}
    >
      <Icon icon="edit" />
    </Button>
  );
};
