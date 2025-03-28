import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Colors } from "../theme/colors";
import Button from "../components/Button";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/background.jpg")}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Tervetuloa Appiin</Text>

        <Button
          onPress={() => navigation.navigate("Login")}
          title="Kirjaudu sisään"
          styleType="primary"
        />

        <Button
          onPress={() => navigation.navigate("Register")}
          title="Rekisteröidy"
          styleType="primary"
        />

      </View>
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
    marginBottom: 30,
    width: "70%",
    color: "white",
    textAlign: "center",
    fontFamily: "Exo_600SemiBold",
  },
});

export default WelcomeScreen;
