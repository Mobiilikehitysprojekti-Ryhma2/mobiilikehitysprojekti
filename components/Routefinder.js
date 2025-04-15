import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/Config";

const Routefinder = ({}) => {
 
   
  



  return (

      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Route</Text>
         
        </View>
      </View>

  );
};
  
  const styles = StyleSheet.create({
    circleButtonContainer: {
      width: 84,
      height: 84,
      marginHorizontal: 60,
      borderWidth: 4,
      borderColor: 'blue',
      borderRadius: 42,
      padding: 3,
    },
    circleButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 42,
      backgroundColor: 'yellow',
    },
  });









  export default Routefinder;
