import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme/colors";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/Config";

const SearchUsersScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  //Fetch users from firebase
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


  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

    // Add friend
    const addFriend = async (friendId) => {
      try {
        const userRef = doc(firestore, "users", currentUserId);
        const friendRef = doc(firestore, "users", friendId);
  
        // Add to both friend lists
        await updateDoc(userRef, {
          friends: arrayUnion(friendId),
        });
        await updateDoc(friendRef, {
          friends: arrayUnion(currentUserId),
        });
  
        console.log("Kaveri lisätty onnistuneesti!");
      } catch (error) {
        console.error("Virhe kaverin lisäämisessä: ", error);
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
      <TextInput
        style={styles.input}
        placeholder="Etsi käyttäjiä"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Image
              source={{ uri: item.profilePicture }}
              style={styles.userImage}
            />
              <Text style={styles.userName}>{item.name}</Text>
            
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addFriend(item.id)}
              >
                <Text style={styles.addButtonText}>Lisää kaveriksi</Text>
              </TouchableOpacity>
            
          </View>
        )}
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
    padding: 20,
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
    borderBottomColor: Colors.background,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth:3,
    borderColor: Colors.onPrimaryContainer,
  },
  userName: {
    fontSize: 18,
    color: Colors.onPrimaryContainer
  },
  addButton: {
    marginTop: 10,
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
