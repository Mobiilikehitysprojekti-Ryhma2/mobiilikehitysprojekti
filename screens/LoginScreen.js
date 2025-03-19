import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Colors } from "../theme/colors";
import { useFonts, Exo_400Regular } from "@expo-google-fonts/exo";
import { MaterialIcons } from "@expo/vector-icons";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let [fontsLoaded, fontError] = useFonts({ Exo_400Regular });

  if (!fontsLoaded && fontError) {
    return null;
  }

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
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

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Kirjaudu</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.loginButtonText}>Jatka</Text>
        </TouchableOpacity>

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
    marginTop: 20,
    marginBottom: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: Colors.secondary,
  },
  loginButton: {
    width: 190,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 40,
    borderWidth: 0,
    backgroundColor: Colors.onPrimaryFixed,
    margin: 20,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  registerText: {
    marginTop: 50,
    color: "#333",
    fontSize: 14,
  },
  registerLink: {
    fontWeight: "bold",
    color: "#0F5D52",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
