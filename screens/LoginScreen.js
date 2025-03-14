import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity} from 'react-native';
import { useState } from 'react';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log("Email:", email);
        console.log("Password:", password);
      };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kirjaudu sisään</Text>
      <TextInput
        style={styles.input}
        placeholder="Sähköposti"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Salasana"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin} >
        <Text style={styles.buttonText}>Kirjaudu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')} >
        <Text style={styles.buttonText}>Jatka</Text>
      </TouchableOpacity>
      <Text style={styles.footer}>Eikö sinulla ole vielä tiliä?</Text>
      <Button title="Rekisteröidy" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor:"#006A66"
    },
    header: {
      fontSize: 24,
      marginBottom: 20,
      color:"white"
    },
    input: {
      width: "100%",
      padding: 10,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      backgroundColor:"white"
    },
    footer: {
      marginTop: 20,
      color: "blue",
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

export default LoginScreen;