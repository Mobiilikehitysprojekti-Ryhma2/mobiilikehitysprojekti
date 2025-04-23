import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { Colors } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import {
  collection,
  getDocs,
  getAuth,
  firestore,
  deleteDoc,
  doc,
} from "../firebase/Config";
import ConfirmationModal from "../components/ConfirmationModal";

export default function FriendScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendsRef = collection(firestore, "users", currentUser.uid, "friends");
        const querySnapshot = await getDocs(friendsRef);

        const friendsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFriends(friendsList);
      } catch (error) {
        console.error("Error fetching friends: ", error);
      }
    };

    if (currentUser) {
      fetchFriends();
    }
  }, [currentUser]);

  const removeFriend = async (friendId) => {
    try {
      await deleteDoc(doc(firestore, "users", currentUser.uid, "friends", friendId));
      await deleteDoc(doc(firestore, "users", friendId, "friends", currentUser.uid));
      setFriends((prev) => prev.filter((friend) => friend.id !== friendId));
      setShowModal(false);
      setSelectedFriend(null);
    } catch (error) {
      console.error("Error removing friend: ", error);
    }
  };

  const filteredUsers = friends.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={42} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Kaverit</Text>
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
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Ei kavereita tai hakutuloksia.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>{item.username || item.email}</Text>
            <View style={styles.iconRow}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedFriend(item);
                  setShowModal(true);
                }}
              >
                <Ionicons name="trash-outline" size={32} color="#ca2b2b" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Chat", { user: item })}
              >
                <Ionicons name="chatbubble-outline" size={32} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <ConfirmationModal
        visible={showModal}
        text={`Haluatko varmasti poistaa ${
          selectedFriend?.username || selectedFriend?.email
        } kaverilistalta?`}
        onConfirm={() => removeFriend(selectedFriend?.id)}
        onCancel={() => {
          setShowModal(false);
          setSelectedFriend(null);
        }}
        buttonStyle={{ backgroundColor: "#ca2b2b" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    padding: 10,
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  iconRow: {
    flexDirection: "row",
    gap: 20,
  },
});
