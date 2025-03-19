import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Colors } from "../theme/colors";
import { useFonts, Exo_600SemiBold } from "@expo-google-fonts/exo";

const WelcomeScreen = ({ navigation }) => {
  let [fontsLoaded, fontError] = useFonts({ Exo_600SemiBold });

  if (!fontsLoaded && fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <Image
        source={require("../assets/background.jpg")}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Tervetuloa Appiin</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Kirjaudu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.buttonText}>Rekisteröidy</Text>
        </TouchableOpacity>
      </View>
=======
      <Text style={styles.text}>Tervetuloa Appiin</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')} >
      <Text style={styles.buttonText}>Kirjaudu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
      <Text style={styles.buttonText}>Rekisteröidy</Text>
      </TouchableOpacity>

>>>>>>> origin/main
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.onPrimaryFixed,
  },
  image: {
    width: "100%",
    height: "55%",
  },
  contentContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: Colors.onPrimaryFixed,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    marginBottom: 50,
    width: "70%",
    color: "white",
    textAlign: "center",
    fontFamily: "Exo_600SemiBold",
  },
  button: {
    width: 190,
    backgroundColor: Colors.onPrimary,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 40,
    borderWidth: 0,
    marginBottom: 15,
  },
  buttonText: {
    color: Colors.onPrimaryContainer,
    fontSize: 16,
    textAlign: "center",
  },
});

export default WelcomeScreen;
