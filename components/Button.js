import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../theme/colors";

const Button = ({ onPress, title, styleType }) => {
  const buttonStyles =
    styleType === "primary" ? styles.primaryButton : styles.secondaryButton;
  const textStyles =
    styleType === "primary" ? styles.primaryButtonText : styles.secondaryButtonText;

  return (
    <TouchableOpacity style={[styles.button, buttonStyles]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyles]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 190,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 40,
    borderWidth: 0,
    margin: 10,
  },
  primaryButton: {
    backgroundColor: Colors.onPrimary,
  },
  secondaryButton: {
    backgroundColor: Colors.onPrimaryFixed,
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
  },
  primaryButtonText: {
    color: Colors.onPrimaryContainer,
  },
  secondaryButtonText: {
    color: "white",
  },
});

export default Button;
