import { Pressable, StyleSheet, Text } from 'react-native';
import { useParams } from "react-router-native";
import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6b4eca',
    padding: 10,
    borderRadius: 8,
    margin: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default function RepositoryView() {
  const { repositoryId } = useParams();

  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId },
    fetchPolicy: 'cache-and-network',
  });
  if (loading) return <Text>Loading...</Text>;
  const repository = data ? data.repository : null;

  return (
    <>
      <RepositoryItem repository={repository} />
      <Pressable onPress={() => Linking.openURL(repository.url)} style={styles.button}>
        <Text style={styles.buttonText}>View on Github</Text>
      </Pressable>
    </>
  )
};