import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import uuid from "react-native-uuid"

const RoutefinderModal = ({ visible, closeModal, markers, setMarkers }) => {
  
//tänne kohteiden haku backendistä kun saadaan päätettyä backendin malli

const fetchMarkers = () => {
 
    const coordinate = {latitude: 65.06254, longitude: 25.465509};
    
          const id = uuid.v4()
          setMarkers([...markers, { id: id, latitude: coordinate.latitude, longitude: coordinate.longitude }
          ]);
}
// 

const FetchHardMarkers = () => {
  const coordinate = {latitude: 65.06254, longitude: 24.56997};
  const id = uuid.v4()
  setMarkers([...markers, { id: id, latitude: coordinate.latitude, longitude: coordinate.longitude }
  ]);


}

const FetchMediumMarkers = () => {

  const coordinate = {latitude: 65.06254, longitude: 25.56997};
  const id = uuid.v4()
  setMarkers([...markers, { id: id, latitude: coordinate.latitude, longitude: coordinate.longitude }
  ]);

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
