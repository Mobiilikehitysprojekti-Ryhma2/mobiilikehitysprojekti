import React from "react";
import SettingButton from "../components/SettingButton";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LogoutButton from "../components/LogoutButton";
import { Colors } from "../theme/colors";

export default function SettingsScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={42} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Asetukset</Text>
      </View>

      <SettingButton
        title={"Tilin asetukset"}
        type={"navigate"}
        screenName={"Profile"}
        iconName={"person-outline"}
      />
      <SettingButton title={"Tumma teema"} type={"switch"} iconName={"eye-outline"} />
      <SettingButton
        title={"Tilin yksityisyys"}
        type={"navigate"}
        screenName={"Profile"}
        iconName={"lock-closed-outline"}
      />
      <SettingButton
        title={"Sijaintiasetukset"}
        type={"navigate"}
        screenName={"Welcome"}
        iconName={"location-outline"}
      />
      <SettingButton
        title={"Tilin poisto"}
        type={"navigate"}
        screenName={"Profile"}
        iconName={"trash-outline"}
      />

      <LogoutButton
        title="Kirjaudu ulos"
        iconName="log-out-outline"
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
    fontFamily: "Exo_400Regular",
  },
});
