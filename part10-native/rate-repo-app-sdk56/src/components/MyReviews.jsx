
import { FlatList, Text } from 'react-native';
import { Review } from './RepositoryView';
import { useQuery } from '@apollo/client/react';
import { GET_ME } from '../graphql/queries';

export default function MyReviews() {
  const { data, loading } = useQuery(GET_ME, {
    variables: {
      includeReviews: true,
    },
    fetchPolicy: 'cache-and-network',
  });
  if (loading) return <Text>Loading...</Text>;
  const me = data ? data.me : null;

  if (me.reviews.edges.length === 0) return <Text>No reviews found</Text>;

  return (
    <FlatList
      data={me.reviews.edges}
      renderItem={({ item }) => (
        <Review review={item.node} />
      )}
    />
  )
}