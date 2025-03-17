import { addDoc, collection, firestore, MESSAGES } from "../firebase/Config";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";


export default function CommunityScreen() {

  // Firebase testing
  const [newMessage, setNewMessage] = useState("")
  const save = async () => {
    const docRef = await addDoc(collection(firestore,MESSAGES), {
    text: newMessage
  })
  setNewMessage("")
  } 

  return (
    <View style={styles.container}>

      {/*Firebase testing*/}
      <TextInput
        placeholder="Viesti"
        backgroundColor="#ffffff"
        value={newMessage}
        onChangeText={text => setNewMessage(text)}
        />
        <Button title="Lähetä" onPress={save}/>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#006A66"
  },
});