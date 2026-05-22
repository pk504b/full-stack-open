import { Pressable, StyleSheet, Text, FlatList, View, Alert } from "react-native";
import { useParams } from "react-router-native";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_REPOSITORY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import * as Linking from "expo-linking";
import { DELETE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6b4eca",
    padding: 10,
    borderRadius: 8,
    margin: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default function RepositoryView() {
  const { repositoryId } = useParams();

  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId },
    fetchPolicy: "cache-and-network",
  });
  if (loading) return <Text>Loading...</Text>;
  const repository = data ? data.repository : null;

  return (
    <>
      <RepositoryItem repository={repository} />
      <Pressable
        onPress={() => Linking.openURL(repository.url)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>View on Github</Text>
      </Pressable>

      <FlatList
        data={repository.reviews.edges}
        renderItem={({ item }) => <Review review={item.node} />}
      />
    </>
  );
}

const reviewStyles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  reviewBox: {
    flexDirection: "row",
  },
  rating: {
    alignSelf: "flex-start",
    borderStyle: "solid",
    borderWidth: 4,
    borderColor: "#6b4eca",
    padding: 10,
    margin: 10,
    borderRadius: 100,
    fontSize: 20,
    fontWeight: "bold",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  createdAt: {
    fontSize: 14,
  },
  text: {
    marginTop: 10,
    fontSize: 14,
    maxWidth: "90%",
  },
  buttonBox: {
    flexDirection: "row",
    marginVertical: 10,
    gap: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#6b4eca",
    padding: 10,
    borderRadius: 8,
  },
  buttonError: {
    backgroundColor: "#ff0000",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
export const Review = ({ review }) => {
  const [mutation, result] = useMutation(DELETE_REVIEW);

  const deleteReview = () => {
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteReviewMutation(),
        },
      ],
    );
  };

  const deleteReviewMutation = async () => {
    mutation({
      variables: {
        reviewId: review.id,
      },
      refetchQueries: ["GetRepository"],
    });
  };

  return (
    <View style={reviewStyles.container}>
      <View style={reviewStyles.reviewBox}>
        <Text style={reviewStyles.rating}>{review.rating}</Text>
        <View>
          <Text style={reviewStyles.username}>{review.user.username}</Text>
          <Text style={reviewStyles.createdAt}>
            {new Date(review.createdAt).toLocaleDateString()}
          </Text>
          <Text style={reviewStyles.text}>{review.text}</Text>
        </View>
      </View>
      <View style={reviewStyles.buttonBox}>
        <Pressable style={reviewStyles.button} 
          onPress={() => Linking.openURL(review.repository.url)}
        >
          <Text style={reviewStyles.buttonText}>View Repository</Text>
        </Pressable>
        <Pressable style={[reviewStyles.button, reviewStyles.buttonError]}
          onPress={deleteReview}
        >
          <Text style={reviewStyles.buttonText}>Delete Review</Text>
        </Pressable>
      </View>
    </View>
  );
};
