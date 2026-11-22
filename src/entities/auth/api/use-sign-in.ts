import { useMutation } from '@tanstack/react-query';
import { fetcher } from '~/shared/api/fetcher';
import { API_PATHS } from '~/shared/constants';
import type { SignInSchema } from '../model/sign-in-schema';

export const useSignIn = () =>
  useMutation<{ returnUrl: string }, Error, SignInSchema>({
    mutationFn: (data) =>
      fetcher.post<{ returnUrl: string }>(API_PATHS.AUTH.SIGN_IN, data),
  });
