// import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Route, Routes } from 'react-router-native';
import SignIn from './SignIn';
import RepositoryView from './RepositoryView';
import CreateReview from './CreateReview';
import Signup from './Signup';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1e4e8",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/my-reviews" element={<MyReviews />} />
        <Route path="/create-review" element={<CreateReview />} />
        <Route path="/repository/:repositoryId" element={<RepositoryView />} />
        <Route path="*" element={<RepositoryList />} />
      </Routes>
    </View>
  );
};

export default Main;