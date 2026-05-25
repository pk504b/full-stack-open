import { useMutation } from '@apollo/client/react';
import { AUTHENTICATE } from '../graphql/mutations';

export const useSignIn = () => {
  const [mutation, result] = useMutation(AUTHENTICATE);

  const signIn = async (credentials) => {
    const response = await mutation({
      variables: {
        credentials,
      },
    });

    return response;
  };

  return [signIn, result];
};