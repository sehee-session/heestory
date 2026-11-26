import { useMutation } from '@tanstack/react-query';
import { fetcher } from '~/shared/api/fetcher';
import { API_PATHS } from '~/shared/constants';

export const useSignOut = () =>
  useMutation<{ returnUrl: string }>({
    mutationFn: () =>
      fetcher.post<{ returnUrl: string }>(API_PATHS.AUTH.SIGN_OUT()),
  });
