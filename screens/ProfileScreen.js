import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme/colors";
import Button from "../components/Button";
import { getUserInfo } from "../helpers/UserInfo";
import { useAvatar } from "../helpers/useAvatar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation }) {
  const [currentUser, setCurrentUser] = useState({});
  const [userAvatar, setUserAvatar] = useState("");

  useFocusEffect(
    useCallback(() => {
      const fetchUser = async () => {
        const userData = await getUserInfo();
        const image = await AsyncStorage.getItem("selectedAvatar");
        setUserAvatar(image);
        setCurrentUser(userData);
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

      <View style={styles.profileHeaderRow}>
        <View style={styles.profileImageContainer}>
          {userAvatar ? (
            <Image source={{ uri: userAvatar }} style={styles.profileImage} />
          ) : (
            <Image
              source={require("../assets/placeHolderProfileImage.jpg")}
              style={styles.profileImage}
            />
          )}
          <Text style={styles.usernameText}>{currentUser.username}</Text>
        </View>

        <View style={styles.toolBar}>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Ionicons
              name="settings"
              size={30}
              color={Colors.primary}
              style={styles.toolbarIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Data")}>
            <Ionicons
              name="bar-chart"
              size={30}
              color={Colors.primary}
              style={styles.toolbarIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Avatar")}>
            <Ionicons
              name="image"
              size={30}
              color={Colors.primary}
              style={styles.toolbarIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentContainer}>
        {currentUser ? (
          <View style={styles.userInfo}>
            <Text style={[styles.userInfoText, { fontWeight: "bold" }]}>Nimi</Text>
            <Text style={styles.userInfoText}>{currentUser.fullName}</Text>

            <Text style={[styles.userInfoText, { fontWeight: "bold" }]}>Bio</Text>
            <Text style={styles.userInfoText}>{currentUser.bio}</Text>

            <Text style={[styles.userInfoText, { fontWeight: "bold" }]}>Maa</Text>
            <Text style={styles.userInfoText}>{currentUser.country}</Text>
          </View>
        ) : (
          <>
            <Text style={styles.userInfoText}>Tietoja ei löydy</Text>
          </>
        )}
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
  goBackButton: {
    position: "absolute",
    top: 60,
    left: 18,
  },
  profileHeaderRow: {
    width: "100%",
    alignItems: "center",
    marginTop: 90,
    paddingHorizontal: 20,
    position: "relative",
  },
  profileImageContainer: {
    alignItems: "center",
    zIndex: 10,
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: Colors.primary,
    marginBottom: 10,
  },
  usernameText: {
    color: Colors.primary,
    fontSize: 26,
    fontWeight: "bold",
    paddingTop: 8,
  },
  toolBar: {
    position: "absolute",
    right: 20,
    top: 0,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  toolbarIcon: {
    marginVertical: 5,
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
  userInfo: {
    width: "90%",
    position: "absolute",
  },
  userInfoText: {
    fontSize: 18,
    textAlign: "left",
    marginVertical: 10,
    color: "white",
  },
});
