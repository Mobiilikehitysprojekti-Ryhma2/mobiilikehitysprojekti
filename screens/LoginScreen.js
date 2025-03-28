import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Colors } from "../theme/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("jee@jee.com");
  const [password, setPassword] = useState("jee123");
  const { login } = useAuth();

  // Function to handle login 
  const handleLogin = async () => {
    try {
      await login(email, password);
/*       navigation.replace("Home");
 */    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBackground}>
        <Text style={styles.title}>Kirjaudu sisään</Text>
      </View>

      <View style={styles.bottomBackground} />

      <View style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={20} color={Colors.secondary} />
          <TextInput
            style={styles.input}
            placeholder="Sähköposti"
            placeholderTextColor={Colors.secondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={20} color={Colors.secondary} />
          <TextInput
            style={styles.input}
            placeholder="Salasana"
            placeholderTextColor={Colors.secondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <Button
          onPress={handleLogin}
          title="Kirjaudu"
          styleType="secondary"
        />

        <Text style={styles.registerText}>Eikö sinulla ole vielä tiliä?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerLink}>Rekisteröidy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.onPrimaryFixed,
  },
  bottomBackground: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  contentContainer: {
    position: "absolute",
    top: "40%",
    alignSelf: "center",
    alignItems: "center",
    width: "90%",
    backgroundColor: Colors.onPrimary,
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontSize: 40,
    color: "white",
    width: "70%",
    textAlign: "center",
    fontFamily: "Exo_400Regular",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.secondaryContainer,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: Colors.secondary,
  },
  registerText: {
    marginTop: 50,
    color: Colors.onPrimaryContainer,
    fontSize: 14,
  },
  registerLink: {
    fontWeight: "bold",
    color: Colors.onPrimaryContainer,
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
