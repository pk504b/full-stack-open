import { View, StyleSheet, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 60 || Constants.statusBarHeight,
    backgroundColor: '#24292e',
    color: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

const AppBar = () => {
  return <View style={styles.container}>
    <Pressable>
      <Link to="/signin">
        <Text style={styles.title}>Sign In</Text>
      </Link>
    </Pressable>
    <Pressable>
      <Link to="/repositories">
        <Text style={styles.title}>Repositories</Text>
      </Link>
    </Pressable>
  </View>;
};

export default AppBar;