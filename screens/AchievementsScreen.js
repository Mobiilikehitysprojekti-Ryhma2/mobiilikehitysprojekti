import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../theme/colors";

export default function AchievementsScreen() {

  const [routes, setRoutes] = useState([
    { id: 1, name: "Eka Reitti", total: 5, completed: 5 },
    { id: 2, name: "Toinen Reitti", total: 6, completed: 3 },
    { id: 3, name: "Vimonen", total: 7, completed: 0 },
  ])

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.infoText}>Suoritetut reitit</Text>
        {routes.map((item, index) => (
          <>
            <Text style={styles.infoText}>{item.name}</Text>
            <Text style={styles.infoText}>{item.completed}/{item.total} Löydetty</Text>
          </>
        ))}
      </View>
    </View>
  );
}

/*        {markers.map((item, index) => (

          <Marker
            key={item.id}
            title={"Marker " + index}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude
            }} */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  contentContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: Colors.onPrimaryFixed,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
  },
  infoText: {
    fontSize: 18,
    textAlign: 'left',
    marginVertical: 10,
    color: "white"
  }
});