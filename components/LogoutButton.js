import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { Colors } from "../theme/colors";

const LogoutButton = ({ iconName, title, onLogoutConfirmed }) => {
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
        <Ionicons name={iconName} size={32} color={Colors.onPrimaryContainer} />
        <Text style={styles.buttonText}>{title}</Text>

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
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Haluatko varmasti kirjautua ulos?</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
                <Text style={styles.modalButtonText}>Kyllä</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Ei</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  // Modal styles 
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: Colors.onPrimary,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: Colors.onPrimaryContainer
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    padding: 10,
    backgroundColor: Colors.onPrimaryFixed,
    borderRadius: 40,
    margin: 5,
    width: "40%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default LogoutButton;
