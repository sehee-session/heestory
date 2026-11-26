import { useMutation } from '@tanstack/react-query';
import { fetcher } from '~/shared/api/fetcher';
import { API_PATHS } from '~/shared/constants';

export const useWithdrawal = () =>
  useMutation({
    mutationFn: () => fetcher.delete(API_PATHS.AUTH.WITHDRAWAL()),
  });
