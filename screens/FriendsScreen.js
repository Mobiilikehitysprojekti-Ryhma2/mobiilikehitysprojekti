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
import { collection, getDocs, getAuth, firestore } from "../firebase/Config";

export default function FriendScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [friends, setFriends] = useState([]);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendsRef = collection(firestore, "users", currentUser.uid, "friends");
        const querySnapshot = await getDocs(friendsRef);

        const friendsList = querySnapshot.docs.map(doc => ({
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
      <TextInput
        style={styles.input}
        placeholder="Etsi käyttäjiä"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
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
            <TouchableOpacity
              onPress={() => navigation.navigate("Chat", { user: item })}
            >
              <Ionicons name="chatbubble-outline" size={32} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
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
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom: 20,
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
