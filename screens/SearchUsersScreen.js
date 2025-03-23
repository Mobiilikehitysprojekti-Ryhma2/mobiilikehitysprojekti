import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme/colors";


const SearchUsersScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([
    { id: "1", name: "Käyttäjä1" },
    { id: "2", name: "Käyttäjä2" },
    { id: "3", name: "Käyttäjä3" },
    { id: "4", name: "Käyttäjä4" },
    { id: "5", name: "Käyttäjä5" },
  ]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 32,
        paddingBottom: 16,
        height: "100%",
        alignItems: "center",
        backgroundColor: Colors.background,
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
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

export default SearchUsersScreen;
