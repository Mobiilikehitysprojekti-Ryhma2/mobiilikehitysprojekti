import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../theme/colors";
import Button from "../components/Button";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState({
    username: "Käyttäjänimi",
    fullName: "Etunimi Sukunimi",
    country: "Suomi",
    bio: "Autem voluptatem atque maiores dignissimos dolorem rerum doloremque.Dolorem sint repudiandae sunt ad voluptatibus.",
    profileImage: require("../assets/placeHolderProfileImage.jpg")
  });

  return (
    <View style={styles.container}>

      <View style={styles.goBackButton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={42} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileToolBar}>

        <Ionicons
          name="settings"
          style={styles.toolbarIcon}
          size={40}
          color={Colors.primary}
          onPress={() => navigation.navigate('Settings')}
        />
        <Ionicons
          name="notifications-outline"
          size={40}
          color={Colors.primary}
          onPress={() => navigation.navigate('Settings')}
        />

      </View>

      <Image
        source={user.profileImage}
        style={styles.profileImage}
      />
      <Text style={styles.username}>{user.username}</Text>


      <View style={styles.contentContainer}>

        <Text style={styles.userInfo}>{user.fullName}</Text>
        <Text style={styles.userInfo}>{user.country}</Text>
        <Text style={styles.userInfo}>{user.bio}</Text>

        <Button title="Lisää kaveriksi" styleType="primary" />{/* TODO: add add to friend functionality */}

      </View>

    </View>
  );
}

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
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    position: "absolute",
    top: 140,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.primary,
    zIndex: 10
  },
  userInfo: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    color: "white"
  },
  username: {
    fontSize: 40,
    color: Colors.primary,
    marginTop: 360,
    textAlign: "center",

  },
  profileToolBar: {
    position: "absolute",
    right: 18,
    top: 60,
  },
  toolbarIcon: {
    paddingBottom: 20,
  },
  goBackButton: {
    position: "absolute",
    top: 60,
    left: 18,
  }
});