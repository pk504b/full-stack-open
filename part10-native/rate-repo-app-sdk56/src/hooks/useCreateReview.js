import { useMutation } from '@apollo/client/react';
import { CREATE_REVIEW } from '../graphql/mutations';

export const useCreateReview = () => {
  const [mutation, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const response = await mutation({
      variables: {
        review: {
          ownerName,
          repositoryName,
          rating,
          text,
        },
      },
    });

    return response;
  };

  return [createReview, result];
};

export default useCreateReview;
