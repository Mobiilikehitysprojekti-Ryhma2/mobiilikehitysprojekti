import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import uuid from "react-native-uuid"
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  createUserWithEmailAndPassword,
  setDoc,
  doc,
  firestore,
  deleteDoc,
} from "../firebase/Config";

const RoutefinderModal = ({ visible, closeModal, markers, setMarkers }) => {
  


const fetchMarkers = () => {
 
    const coordinate = {latitude: 65.06254, longitude: 25.465509};
    
          const id = uuid.v4()
          setMarkers([...markers, { id: id, latitude: coordinate.latitude, longitude: coordinate.longitude }
          ]);
}
// 

const FetchHardMarkers = async () => {
  try {
    const markersCollectionRef = firestore().collection('markers');
    const snapshot = await markersCollectionRef.get();

    const fetchedMarkers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(), 
    }));

    //console.log('Markers:', fetchedMarkers);
    setMarkers([...markers, { id: id, latitude: coordinate.latitude, longitude: coordinate.longitude }
    ]);

    return fetchedMarkers;
  } catch (error) {
    console.error("Error markers:", error);
    return [];
  }
}

const FetchMediumMarkers = async () => {
  try {
    const markersCollectionRef = firestore().collection('markers');
    const snapshot = await markersCollectionRef.get();

    const fetchedMarkers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(), 
    }));

    //console.log('Markers:', fetchedMarkers);
    
    setMarkers([...markers, { id: id, latitude: coordinate.latitude, longitude: coordinate.longitude }
    ]);

    return fetchedMarkers;
  } catch (error) {
    console.error("Error markers:", error);
    return [];
  }

}

return visible ? (
 
    <View style={styles.modalContent}>
    
      <Button title="Reitit" onPress={fetchMarkers} />
      <Button title="MediumReitit" onPress={FetchMediumMarkers} />
      <Button title="HardReitit" onPress={FetchHardMarkers} />
      <Button title="Close" onPress={closeModal} />
    </View>
 
) : null; 
};
  
  const styles = StyleSheet.create({
   
    modalContent: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      width: "100%",
      alignItems: "center",
      flexDirection: 'row',
      alignItems: 'center',
    },
  });









  export default RoutefinderModal;
