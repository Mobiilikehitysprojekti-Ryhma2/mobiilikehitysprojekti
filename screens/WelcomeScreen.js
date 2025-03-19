import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tervetuloa Appiin</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')} >
      <Text style={styles.buttonText}>Kirjaudu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
      <Text style={styles.buttonText}>Rekisteröidy</Text>
      </TouchableOpacity>

      {/* Temporary button for testing*/}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
      <Text style={styles.buttonText}>Asetukset</Text>
      </TouchableOpacity>  

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#006A66"
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color:"white"
  },
  button: {
    width: 190,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonText: {
    color: 'black', 
    fontSize: 16,
    textAlign: 'center',
  },
});

export default WelcomeScreen;