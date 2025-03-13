import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Etusivu</Text>
      <Button title="Profiili" onPress={() => navigation.navigate('Profile')} />
      <Button title="Asetukset" onPress={() => navigation.navigate('Settings')} />
      <Button title="Data" onPress={() => navigation.navigate('Data')} />
      <Button title="Ystävät" onPress={() => navigation.navigate('Friends')} />
      <Button title="Chat" onPress={() => navigation.navigate('Chat')} />
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

export default HomeScreen;