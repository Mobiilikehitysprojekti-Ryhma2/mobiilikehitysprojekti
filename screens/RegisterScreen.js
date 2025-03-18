import { View, Text, StyleSheet, Button, TextInput} from 'react-native';
import { useState } from 'react';

const RegisterScreen = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = () => {
        if (password !== confirmPassword) {
          alert("Salasanat eivät täsmää");
          return;
        }
        console.log("Email:", email);
        console.log("Username:", username);
        console.log("Password:", password);
      };
    
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Luo uusi tili</Text>
      <TextInput
        style={styles.input}
        placeholder="Sähköposti"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Käyttäjänimi"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Salasana"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Vahvista salasana"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Rekisteröidy" onPress={handleRegister} />
      <Text style={styles.footer}>Onko sinulla jo tili?</Text>
      <Button title="Kirjaudu sisään" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    header: {
      fontSize: 24,
      marginBottom: 20,
    },
    input: {
      width: "100%",
      padding: 10,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
    },
    footer: {
      marginTop: 20,
      color: "blue",
    },
  });

export default RegisterScreen;