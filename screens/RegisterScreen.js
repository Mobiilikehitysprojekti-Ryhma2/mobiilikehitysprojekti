import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from "react-native";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Colors } from "../theme/colors";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../components/Button";

const RegisterScreen = ({ navigation }) => {
  const { register } = useAuth();
  const [email, setEmail] = useState("juu@juu.com");
  const [username, setUsername] = useState("juu");
  const [password, setPassword] = useState("juu123");
  const [confirmPassword, setConfirmPassword] = useState(password);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Register function
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Salasanat eivät täsmää");
      setModalVisible(true);
      return;
    }
    if (!username || username.trim() === "") {
      setErrorMessage("Käyttäjänimi on pakollinen");
      setModalVisible(true);
      return;
    }
    try {
      await register(email, password, username);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Sähköposti on jo käytössä");
        setModalVisible(true);
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage("Sähköposti ei kelvollinen");
        setModalVisible(true);
      } else if (error.code === "auth/weak-password") {
        setErrorMessage("Salasanan tulee olla vähintään 6 merkkiä");
        setModalVisible(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBackground}>
        <Text style={styles.title}>Rekisteröidy</Text>
      </View>

      <View style={styles.bottomBackground} />

      <View style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={20} color={Colors.secondary} />
          <TextInput
            style={styles.input}
            placeholder="Sähköposti"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="person" size={20} color={Colors.secondary} />
          <TextInput
            style={styles.input}
            placeholder="Käyttäjänimi"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={20} color={Colors.secondary} />
          <TextInput
            style={styles.input}
            placeholder="Salasana"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <Text style={styles.passwordText}>
          Salasanan tulee olla vähintään 6 merkkiä pitkä
        </Text>
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={20} color={Colors.secondary} />
          <TextInput
            style={styles.input}
            placeholder="Vahvista salasana"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <Button onPress={handleRegister} title="Rekisteröidy" styleType="secondary" />

        <Text style={styles.loginText}>Onko sinulla jo tili?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>Kirjaudu</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for error messages */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.onPrimaryFixed,
  },
  bottomBackground: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  contentContainer: {
    position: "absolute",
    top: "40%",
    alignSelf: "center",
    alignItems: "center",
    width: "90%",
    backgroundColor: Colors.onPrimary,
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontSize: 40,
    color: "white",
    width: "70%",
    textAlign: "center",
    fontFamily: "Exo_400Regular",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.secondaryContainer,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: Colors.secondary,
  },
  passwordText: {
    fontSize: 12,
    width: "100%",
  },
  loginText: {
    marginTop: 20,
    color: Colors.onPrimaryContainer,
    fontSize: 14,
  },
  loginLink: {
    fontWeight: "bold",
    color: Colors.onPrimaryContainer,
    fontSize: 16,
    textDecorationLine: "underline",
  },

  /* Modal styles */
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
    color: Colors.onPrimaryContainer,
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

export default RegisterScreen;
