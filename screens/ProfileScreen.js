import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../theme/colors";
import Button from "../components/Button";
import { getUserInfo } from "../helpers/UserInfo";
import { useAvatar } from "../helpers/useAvatar";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation }) {

  const [currentUser, setCurrentUser] = useState({})
  const [userAvatar, setUserAvatar] = useState("")

  useFocusEffect(
    useCallback(() => {
      const fetchUser = async () => {
        const userData = await getUserInfo()
        const image = await AsyncStorage.getItem('selectedAvatar')
        setUserAvatar(image)
        setCurrentUser(userData)
      };

      fetchUser();
    }, [])
  );


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
        <Ionicons
          name="bar-chart"
          size={40}
          color={Colors.primary}
          onPress={() => navigation.navigate('Data')}
        />
        <Ionicons
          name="image"
          size={40}
          color={Colors.primary}
          onPress={() => navigation.navigate('Avatar')}
        />
      </View>

      {useAvatar ? (
        <Image
        source={{ uri: userAvatar }}
          style={styles.profileImage}
        />
      ) : (
        <Image
          source={require("../assets/placeHolderProfileImage.jpg")}
          style={styles.profileImage}
        />)}

      <View style={styles.username}>
        <Text style={styles.usernameText}>{currentUser.username}</Text>
      </View>

      <View style={styles.contentContainer}>
        {currentUser ? (

          <View style={styles.userInfo}>

            <Text style={styles.userInfoText}>Nimi</Text>
            <Text style={styles.userInfoText}>{currentUser.fullName}</Text>

            <Text style={styles.userInfoText}>Bio</Text>
            <Text style={styles.userInfoText}>{currentUser.bio}</Text>

            <Text style={styles.userInfoText}>Maa</Text>
            <Text style={styles.userInfoText}>{currentUser.country}</Text>
            
          </View>

        ) : (
          <>
            <Text style={styles.userInfoText}>Tietoja ei löydy</Text>
          </>
        )

        }
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
    top: 120,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.primary,
    zIndex: 10
  },
  username: {
    position: "absolute",
    top: 320,
  },
  usernameText: {
    color: Colors.primary,
    fontSize: 26,
    fontWeight: "bold",
    paddingTop: 8,
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
  },
  userInfo: {
    width: "90%",
    position: "absolute",
    bottom: 20
  },
  userInfoText: {
    fontSize: 18,
    textAlign: 'left',
    marginVertical: 10,
    color: "white"
  }
});