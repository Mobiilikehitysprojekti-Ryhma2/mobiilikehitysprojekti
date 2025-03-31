import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { Colors } from "../theme/colors";
import ConfirmationModal from "../components/ConfirmationModal";

const LogoutButton = () => {
  const { logout } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  // Function to handle logout
  const handleLogout = () => {
    logout();
    setModalVisible(false);
  };

  return (
    <View>
      <View style={styles.logoutButtonContainer}>
        <Ionicons name="log-out-outline" size={32} color={Colors.onPrimaryContainer} />
        <Text style={styles.buttonText}>Kirjaudu ulos</Text>

        {/* Chevron-icon */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons
            name="chevron-forward-outline"
            size={32}
            color={Colors.onPrimaryContainer}
          />
        </TouchableOpacity>
      </View>

      {/* Modal for logout confirmation */}
      <ConfirmationModal
        visible={modalVisible}
        text="Haluatko varmasti kirjautua ulos?"
        onConfirm={handleLogout}
        onCancel={() => setModalVisible(false)}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  logoutButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.onPrimary,
    width: "100%",
    marginTop: 20,
    padding: 16,
  },
  buttonText: {
    color: Colors.onPrimaryContainer,
    marginLeft: 30,
    fontSize: 16,
    flex: 1,
  },
  
});

export default LogoutButton;
