import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link, useNavigate } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client/react';
import { GET_ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: 60 || Constants.statusBarHeight,
    backgroundColor: '#24292e',
    color: '#fff',
    padding: 20,
    flexDirection: 'row',
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 8,
  },
});

const AppBar = () => {
  const { data, loading } = useQuery(GET_ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const handleSignout = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/signin');
  };

  if (loading) return <Text>Loading...</Text>;

  return <View style={styles.container}>
    <ScrollView horizontal>
      {data && data.me ? (
        <Pressable style={styles.button} onPress={handleSignout}>
          <Text style={styles.title}>Sign out</Text>
        </Pressable>
      ) : (
        <Pressable>
          <Link to="/signin" style={styles.button}>
            <Text style={styles.title}>Sign In</Text>
          </Link>
        </Pressable>
      )}
      <Pressable >
        <Link to="/repositories" style={styles.button}>
          <Text style={styles.title}>Repositories</Text>
        </Link>
      </Pressable>
    </ScrollView>
  </View>;
};

export default AppBar;