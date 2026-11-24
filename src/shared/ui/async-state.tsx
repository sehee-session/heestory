import React from 'react';
import { Spinner } from './spinner';

type AsyncStateProps = {
  isPending: boolean;
  isError: boolean;
  isEmpty?: boolean;
  error?: React.ReactNode;
  empty?: React.ReactNode;
  children: React.ReactNode;
};

export const AsyncState = ({
  isPending,
  isError,
  isEmpty,
  error,
  empty,
  children,
}: AsyncStateProps) => {
  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return error ?? null;
  }

  if (isEmpty) {
    return empty ?? null;
  }

  return children;
};
