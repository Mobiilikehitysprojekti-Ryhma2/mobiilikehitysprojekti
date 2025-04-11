import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Colors } from "../theme/colors";

const ConfirmationModal = ({ visible, text, onConfirm, onCancel, buttonStyle }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{text}</Text>

              <View style={styles.modalButtons}>
                <TouchableOpacity style={[styles.modalButton, buttonStyle]} onPress={onConfirm}>
                  <Text style={styles.modalButtonText}>Kyllä</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.modalButton} onPress={onCancel}>
                  <Text style={styles.modalButtonText}>Ei</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default ConfirmationModal;
