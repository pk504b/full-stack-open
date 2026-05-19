import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

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
  return <View style={styles.container}>
    <ScrollView horizontal>
      <Pressable>
        <Link to="/signin" style={styles.button}>
          <Text style={styles.title}>Sign In</Text>
        </Link>
      </Pressable>
      <Pressable >
        <Link to="/repositories" style={styles.button}>
          <Text style={styles.title}>Repositories</Text>
        </Link>
      </Pressable>
    </ScrollView>
  </View>;
};

export default AppBar;