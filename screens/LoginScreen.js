import { View, Text, StyleSheet, Button} from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Kirjaudu sisään</Text>
      <Button title="Rekisteröidy" onPress={() => navigation.navigate('Register')} />
      <Button title="Jatka ilman kirjautumista" onPress={() => navigation.navigate('Home')} />
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

export default LoginScreen;