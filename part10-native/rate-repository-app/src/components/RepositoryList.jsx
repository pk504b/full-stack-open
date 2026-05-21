import { FlatList, Pressable, Text, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import useDebounce from '../hooks/useDebounce';

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
  const [sortBy, setSortBy] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);

  const { data, loading } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy: sortBy === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE',
      orderDirection: sortBy === 'latest' ? 'DESC' : sortBy === 'highestRated' ? 'DESC' : 'ASC',
      searchKeyword: debouncedSearchKeyword,
    },
    fetchPolicy: 'cache-and-network',
  });
  const navigate = useNavigate();

  if (loading && !data) return <Text>Loading...</Text>;

  return (
    <>
      <TextInput
        placeholder="Search repositories"
        style={{ padding: 10, borderRadius: 8, margin: 10, borderWidth: 1, borderColor: '#000' }}
        value={searchKeyword}
        onChangeText={(text) => setSearchKeyword(text)}
      />
        <Picker
          selectedValue={sortBy}
          style={{ marginHorizontal: 10 }}
          onValueChange={(itemValue, itemIndex) =>
            setSortBy(itemValue)
          }>
          <Picker.Item label="Latest" value="latest" />
          <Picker.Item label="Highest rated" value="highestRated" />
          <Picker.Item label="Lowest rated" value="lowestRated" />
        </Picker>

      <RepositoryListContainer
        data={data}
        onRepositoryPress={(id) => navigate(`/repository/${id}`)}
      />
    </>
  );
};

export default RepositoryList;