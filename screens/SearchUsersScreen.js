import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme/colors";
import {
  firestore,
  collection,
  getDocs,
  getAuth,
  doc,
  deleteDoc,
} from "../firebase/Config";
import { addFriend } from "../helpers/AddFriend";
import ConfirmationModal from "../components/ConfirmationModal";

const SearchUsersScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserToRemove, setSelectedUserToRemove] = useState(null);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  // Fetch users from firebase
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "users"));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };
    fetchUsers();
  }, []);

  // Fetch friends from firebase
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendSnapshot = await getDocs(
          collection(firestore, "users", currentUser.uid, "friends")
        );
        const friendIds = friendSnapshot.docs.map((doc) => doc.id);
        setFriends(friendIds);
      } catch (error) {
        console.error("Error fetching friends: ", error);
      }
    };

    if (currentUser?.uid) {
      fetchFriends();
    }
  }, [currentUser]);

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
      user.id !== currentUser.uid
  );

  const removeFriend = async ({ userId, friendId }) => {
    try {
      await deleteDoc(doc(firestore, "users", userId, "friends", friendId));
      await deleteDoc(doc(firestore, "users", friendId, "friends", userId));
      setFriends((prev) => prev.filter((id) => id !== friendId));
      setShowModal(false);
      setSelectedUserToRemove(null);
      console.log("Friend removed");
    } catch (error) {
      console.error("Error removing friend: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={42} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Käyttäjien haku</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Etsi käyttäjiä"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <View style={styles.userInfo}>
              <Image source={{ uri: item.profilePicture }} style={styles.userImage} />
              <Text style={styles.userName}>{item.username}</Text>
            </View>

            {friends.includes(item.id) ? (
              <TouchableOpacity
                style={[styles.addButton, { backgroundColor: "#ca2b2b" }]}
                onPress={() => {
                  setSelectedUserToRemove(item);
                  setShowModal(true);
                }}
              >
                <Text style={styles.addButtonText}>Poista kaveri</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.addButton}
                onPress={async () => {
                  await addFriend({
                    userEmail: currentUser.email,
                    userId: currentUser.uid,
                    friendId: item.id,
                    friendEmail: item.email,
                  });
                  setFriends((prev) => [...prev, item.id]);
                }}
              >
                <Text style={styles.addButtonText}>Lisää kaveriksi</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      <ConfirmationModal
        visible={showModal}
        text={`Haluatko varmasti poistaa ${selectedUserToRemove?.username} kaverilistalta?`}
        onConfirm={() =>
          removeFriend({
            userId: currentUser.uid,
            friendId: selectedUserToRemove?.id,
          })
        }
        onCancel={() => {
          setShowModal(false);
          setSelectedUserToRemove(null);
        }}
        buttonStyle={{ backgroundColor: "#ca2b2b" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 16,
    backgroundColor: Colors.background,
    width: "100%",
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
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "90%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    backgroundColor: "#ffffff",
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
    gap: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 3,
    borderColor: Colors.onPrimaryContainer,
  },
  userName: {
    fontSize: 18,
    color: Colors.onPrimaryContainer,
    flexShrink: 1,
  },
  addButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default SearchUsersScreen;
