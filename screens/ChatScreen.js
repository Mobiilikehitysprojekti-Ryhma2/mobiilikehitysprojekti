import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Colors } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import {
  firestore,
  MESSAGES,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "../firebase/Config";
import { convertFirebaseTimeStampToJS } from "../helper/Functions";

export default function ChatScreen({ navigation, route }) {
  const { user } = route.params; //User information from the previous page
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollViewRef = useRef();

  const save = async () => {
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp(),
      sender: "me",
    }).catch((error) => console.log(error));
    setNewMessage("");
  };

  useEffect(() => {
    const q = query(collection(firestore, MESSAGES), orderBy("created", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempMessages = [];
      querySnapshot.forEach((doc) => {
        tempMessages.push({
          ...doc.data(),
          id: doc.id,
          created: convertFirebaseTimeStampToJS(doc.data().created),
        });
      });
      setMessages(tempMessages);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={42} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{user.name}</Text>
      </View>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ Animated: true })
        }
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.sender === "me" ? styles.myMessage : styles.otherMessage,
            ]}
          >
            <Text>{message.text}</Text>
            <Text style={styles.messageInfo}>{message.created}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
          placeholder="Kirjoita viesti..."
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => {
            save();
          }}
        >
          <Ionicons name="send" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    backgroundColor: Colors.background,
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
  messageBubble: {
    padding: 12,
    marginVertical: 4,
    marginHorizontal: 16,
    backgroundColor: Colors.secondaryContainer,
    borderRadius: 16,
    alignSelf: "flex-start",
    maxWidth: "80%",
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: Colors.secondaryContainer,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 0,
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: Colors.secondaryContainer,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  messageInfo: {
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderTop: 16,
    borderColor: "#aaa",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    padding: 12,
    backgroundColor: "#fff",
    marginRight: 8,
  },
  sendButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: Colors.primary,
  },
});
