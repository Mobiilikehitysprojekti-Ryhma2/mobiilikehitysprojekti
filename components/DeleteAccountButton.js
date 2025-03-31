import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { Colors } from "../theme/colors";
import ConfirmationModal from "../components/ConfirmationModal";

const DeleteAccountButton = () => {
  const { deleteAccount } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  const handleDeleteAccount = async () => {
    await deleteAccount();
    setModalVisible(false);
  };

  return (
    <View>
      <View style={styles.buttonContainer}>
        <Ionicons name="trash-outline" size={32} color={Colors.onPrimaryContainer} />
        <Text style={styles.buttonText}>Tilin poisto</Text>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="chevron-forward-outline" size={32} color={Colors.onPrimaryContainer} />
        </TouchableOpacity>
      </View>

      {/* Modal for account deletion */}
      <ConfirmationModal
        visible={modalVisible}
        text="Haluatko varmasti poistaa tilisi?"
        onConfirm={handleDeleteAccount}
        onCancel={() => setModalVisible(false)}
        buttonStyle={{backgroundColor: "#ca2b2b"}}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.onPrimary,
    width: "100%",
    padding: 16,
  },
  buttonText: {
    color: Colors.onPrimaryContainer,
    marginLeft: 30,
    fontSize: 16,
    flex: 1,
  },
});

export default DeleteAccountButton;
