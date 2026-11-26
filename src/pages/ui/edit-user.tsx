import { useForm } from '@tanstack/react-form';
import { data, useLoaderData, useNavigate } from 'react-router';
import {
  createUserRepository,
  EditUserIntroForm,
  useEditUserIntro,
  USER_ERROR,
  USER_TOAST_MESSAGE,
} from '~/entities/user';
import { WithdrawalForm } from '~/features/auth';
import { authUserContext } from '~/shared/auth';
import { COMMON_ERROR, PATHS } from '~/shared/constants';
import { cloudflareContext } from '~/shared/lib/cloudflare';
import { toast } from '~/shared/lib/toast';
import { Button, Icon } from '~/shared/ui';
import { Header } from '~/widgets/header';
import type { Route } from './+types/edit-user';
import * as styles from './edit-user.css';

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

  const authUser = context.get(authUserContext);

  if (user.id !== authUser?.id) {
    throw data(COMMON_ERROR.FORBIDDEN.message, {
      status: COMMON_ERROR.FORBIDDEN.status,
    });
  }

  return { user };
};

const Page = ({ params }: Route.ComponentProps) => {
  const { user } = useLoaderData<typeof loader>();

  const mutation = useEditUserIntro();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: { intro: user?.intro ?? '' },
    onSubmit: async ({ value }) => {
      const result = await mutation.mutateAsync({
        id: user.id,
        intro: value.intro,
      });
      toast.success(USER_TOAST_MESSAGE.EDIT_SUCCESS);
      navigate(PATHS.USERS.DETAIL(result.username));
    },
  });

  return (
    <>
      <Header
        text={`${params.username}/edit`}
        actions={[
          <Button
            key="save"
            title="save"
            variant="icon"
            aria-label="저장"
            onClick={() => form.handleSubmit()}
            disabled={mutation.isPending}
          >
            <Icon icon="save" />
          </Button>,
        ]}
      />
      <main className={styles.main}>
        <div className={styles.section}>
          <h2>{params.username} 정보 수정</h2>
          <EditUserIntroForm form={form} />
        </div>
        <WithdrawalForm />
      </main>
    </>
  );
};

export default Page;
