import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../theme/colors";
import Button from "../components/Button";
import { TextInput } from "react-native-paper";
import { addDoc, collection, firestore, getAuth, doc, setDoc, getDoc } from "../firebase/Config"
import { useAuth } from "../context/AuthContext";
import InfoEditor from "../components/InfoEditor";


export default function ProfileScreen({ navigation }) {

  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      const userRef = doc(firestore, "users", user.uid)
      const userSnap = await getDoc(userRef);
      console.log("USER INFO", userSnap.data())
      if (userSnap.exists()) {
        console.log("User Data:", userSnap.data());
        setCurrentUser(userSnap.data())
      } else {
        console.log("No user data found!");
        return null;
      }

    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }

  }

  const updateUserInfo = async (updatedUser) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("No authenticated user found");
      return;
    }

    const userRef = doc(firestore, "users", user.uid);

    try {
      await setDoc(userRef, updatedUser);
      console.log("User info updated successfully");
      getUserInfo()
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

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
          name="alert"
          size={40}
          color={Colors.primary}
          onPress={() => navigation.navigate('Data')}
        />

      </View>

      <Image
        source={require("../assets/placeHolderProfileImage.jpg")}
        style={styles.profileImage}
      />

        {currentUser ? (<>
          <InfoEditor
            info={currentUser.username}
            toUpdate={"username"}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            updateUserInfo={updateUserInfo}
            isUserName={true}
          />
        </>
        ) : (
          <Text style={styles.username}>Ei käyttäjänimeä</Text>
        )}

      <View style={styles.contentContainer}>

        {currentUser ? (
          <>
            <InfoEditor
              info={currentUser.fullName}
              toUpdate={"fullName"}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              updateUserInfo={updateUserInfo}
            />
            <InfoEditor
              info={currentUser.bio}
              toUpdate={"bio"}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              updateUserInfo={updateUserInfo}
            />
            <InfoEditor
              info={currentUser.country}
              toUpdate={"country"}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              updateUserInfo={updateUserInfo}
            />
          </>
        ) : (
          <>
            <Text style={styles.userInfo}>Tietoja ei löydy</Text>
          </>
        )

        }

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
    top: 120,
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
    marginTop: 340,
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