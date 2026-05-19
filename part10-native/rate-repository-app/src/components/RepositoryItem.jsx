import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  headerTexts: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#666',
    maxWidth: '78%',
  },
  language: {
    alignSelf: 'flex-start',
    backgroundColor: '#0366d6',
    color: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  stats: {
    marginTop: 28,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statsItemNumber: {
    fontWeight: 'bold',
    color: '#000',
  },
  statsItemText: {
    color: '#666',
    fontSize: 14,
  },
});

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Image 
            style={styles.image}
            source={{ uri: repository.ownerAvatarUrl }}
          />
          <View style={styles.headerTexts}>
            <Text style={styles.title}>{repository.fullName}</Text>
            <Text style={styles.description}>{repository.description}</Text>
            <Text style={styles.language}>{repository.language}</Text>
          </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.statsItem}>
          <Text style={styles.statsItemNumber}>{repository.stargazersCount}</Text>
          <Text style={styles.statsItemText}>Stars</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsItemNumber}>{repository.forksCount}</Text>
          <Text style={styles.statsItemText}>Forks</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsItemNumber}>{repository.reviewCount}</Text>
          <Text style={styles.statsItemText}>Reviews</Text>
        </View>
        <View style={styles.statsItem}> 
          <Text style={styles.statsItemNumber}>{repository.ratingAverage}</Text>
          <Text style={styles.statsItemText}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;