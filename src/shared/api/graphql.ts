import { GraphQLClient } from 'graphql-request';

type CreateGraphqlClientParams = {
  url: string;
  apiKey: string;
  accessToken?: string;
};

const createGraphqlClient = ({
  url,
  apiKey,
  accessToken,
}: CreateGraphqlClientParams) =>
  new GraphQLClient(`${url}/graphql/v1`, {
    headers: {
      apikey: apiKey,
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });

export type RepositoryConfig = {
  url: string;
  apiKey: string;
  accessToken?: string;
};

export const createRepository = (config: RepositoryConfig) => {
  const client = createGraphqlClient(config);

  return {
    request: client.request.bind(client),
  };
};
