import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { TextInput } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../theme/colors'
import React, { useState } from 'react'

export default function InfoEditor(props) {


  const [isEditing, setIsEditing] = useState(false)
  const [newInfo, setNewInfo] = useState("")

  const toUpdate = props.toUpdate
  const currentUser = props.currentUser
  const displayInfo = props.info || props.toUpdate

  const handleConfirm = async () => {
    if (newInfo !== "") { // Allow updates when newInfo is not empty
      const updatedUser = { ...currentUser, [toUpdate]: newInfo };
      props.setCurrentUser(updatedUser);
      await props.updateUserInfo(updatedUser);
    }
    setIsEditing(false);
  };

  return (

    isEditing ? (
      <View style={styles.container}>
        <TextInput
          placeholder={props.info}
          value={newInfo}
          onChangeText={text => setNewInfo(text)}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleConfirm}>
          <Ionicons name="checkmark-circle-outline" size={40} backgroundColor={Colors.secondaryContainer}/>
        </TouchableOpacity>
      </View>
    ) : (
      <>
        <TouchableOpacity onPress={() => {
          setNewInfo(props.info)
          setIsEditing(true)
        }}>

            <Text style={styles.userInfo}>{displayInfo}</Text>

        </TouchableOpacity>
      </>
    )
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16
  },
  userInfo: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    color: "black"
  },
  username: {
    fontSize: 40,
    color: Colors.primary,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    fontSize: 16,
    padding: 5,
    color: "black",
    width: "90%",
  }
});