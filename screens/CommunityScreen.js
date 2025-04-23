import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SettingButton from "../components/SettingButton";
import { Colors } from "../theme/colors";

export default function CommunityScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Yhteisö</Text>
      </View>
      <SettingButton
        title={"Hae käyttäjiä"}
        type={"navigate"}
        screenName={"Search Users"}
        iconName={"person-outline"}
      />
      <SettingButton
        title={"Kaverit"}
        type={"navigate"}
        screenName={"Friends"}
        iconName={"people-outline"}
      />
      <SettingButton
        title={"Viimeisimmät kommentit"}
        type={"navigate"}
        screenName={"Recent Comments"}
        iconName={"chatbubble-outline"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingBottom: 16,
    height: "100%",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    fontSize: 40,
    color: Colors.onPrimaryContainer,
    fontFamily: "Exo_600SemiBold",
  },
});
