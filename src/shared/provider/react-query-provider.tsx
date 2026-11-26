import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { toast } from '../lib/toast';

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) => {
        toast.error(error.message || 'Internal Server Error');
      },
    },
  },
});

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
