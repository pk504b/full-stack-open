import { FlatList, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';

export const RepositoryListContainer = ({ data }) => {
  const repositoryNodes = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
    />
  )
}

const RepositoryList = () => {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });
  if (loading) return <Text>Loading...</Text>;

  return <RepositoryListContainer data={data} />;
};

export default RepositoryList;