import { View, Text, StyleSheet} from 'react-native';

const FriendsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ystävät</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default FriendsScreen;