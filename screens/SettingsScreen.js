import React from "react";
import SettingButton from "../components/SettingButton";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen({navigation}) {
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
      <SettingButton
        title={"Teema"}
        type={"switch"}
        iconName={"eye-outline"}
      />
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


      <View style={styles.container}>
        <SettingButton
          title={"Kirjaudu ulos"}
          type={"navigate"}
          screenName={"Welcome"}
          iconName={"log-out-outline"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F4FBF9"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,


  },
  headerText: {
    flex: 1,
    fontSize: 42,
    textAlign: "center",
  },
  setting: {
    backgroundColor: "#ffffff",
    width: "80%",
    height: 16,
  }


});