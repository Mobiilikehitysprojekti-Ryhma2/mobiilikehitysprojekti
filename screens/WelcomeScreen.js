import React from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tervetuloa</Text>
      <Button title="Kirjaudu sisään" onPress={() => navigation.navigate('Login')} />
      <Button title="Rekisteridy" onPress={() => navigation.navigate('Register')} />     
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

export default WelcomeScreen;