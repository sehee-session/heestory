import { useNavigate } from 'react-router';
import { useWithdrawal } from '~/entities/auth';
import { PATHS } from '~/shared/constants';
import { useAuth } from '~/shared/hooks';
import { Button, Confirm } from '~/shared/ui';

export const WithdrawalForm = () => {
  const { isAuthenticated } = useAuth();
  const mutation = useWithdrawal();
  const navigate = useNavigate();

  const onSubmit = async () => {
    await mutation.mutateAsync();
    navigate(PATHS.HOME);
  };

  if (!isAuthenticated) return null;

  return (
    <Confirm
      trigger={
        <Button variant="warning" aria-label="회원 탈퇴">
          회원 탈퇴
        </Button>
      }
      title="회원 탈퇴"
      description="정말로 회원 탈퇴를 진행하시겠습니까?"
      confirmText="회원 탈퇴"
      cancelText="취소"
      confirmVariant="warning"
      onConfirm={onSubmit}
    />
  );
};
