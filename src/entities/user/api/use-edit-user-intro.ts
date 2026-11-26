import { useMutation } from '@tanstack/react-query';
import { fetcher } from '~/shared/api/fetcher';
import { API_PATHS } from '~/shared/constants';
import type { UpdateUserIntroSchema } from '../model/update-user-intro-schema';

export const useEditUserIntro = () =>
  useMutation({
    mutationFn: async ({ id, intro }: UpdateUserIntroSchema & { id: string }) =>
      fetcher.patch<{ username: string }>(API_PATHS.USER.DETAIL(id), {
        intro,
      }),
  });
