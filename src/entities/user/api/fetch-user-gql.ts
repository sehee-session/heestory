import { createGraphqlClient } from '~/shared/api';

type UserRepositoryConfig = {
  url: string;
  apiKey: string;
  accessToken?: string;
};

export const createUserRepository = ({
  url,
  apiKey,
  accessToken,
}: UserRepositoryConfig) => {
  const client = createGraphqlClient({ url, apiKey, accessToken });

  return {};
};
