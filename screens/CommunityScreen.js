import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

export default function CommunityScreen() {
  return (
    <View style={styles.container}>
      <Text> CommunityScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#006A66"
  },
});