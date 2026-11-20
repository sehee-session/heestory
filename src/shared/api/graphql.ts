import { GraphQLClient } from 'graphql-request';

type CreateGraphqlClientParams = {
  url: string;
  apiKey: string;
  accessToken?: string;
};

export const createGraphqlClient = ({
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
