import { FlatList, Pressable, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useNavigate } from 'react-router-native';

export const RepositoryListContainer = ({ data, onRepositoryPress }) => {
  const repositoryNodes = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => (
        <Pressable onPress={() => onRepositoryPress(item.id)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
    />
  )
}

const RepositoryList = () => {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });
  const navigate = useNavigate();

  if (loading) return <Text>Loading...</Text>;

  return (
    <RepositoryListContainer
      data={data}
      onRepositoryPress={(id) => navigate(`/repository/${id}`)}
    />
  );
};

export default RepositoryList;