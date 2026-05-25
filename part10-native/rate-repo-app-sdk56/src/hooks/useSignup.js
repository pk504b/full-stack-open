import { useMutation } from '@apollo/client/react';
import { CREATE_USER } from '../graphql/mutations';

export const useSignup = () => {
  const [mutation, result] = useMutation(CREATE_USER);

  const signup = async (user) => {
    const response = await mutation({
      variables: {
        user,
      },
    });

    return response;
  };

  return [signup, result];
};