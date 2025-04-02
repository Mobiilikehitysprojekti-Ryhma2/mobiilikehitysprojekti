import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import React, { useState } from 'react';


const RoutefinderModal = ({ visible, closeModal, markers, setMarkers }) => {
  
//tänne kohteiden haku backendistä kun saadaan päätettyä backendin malli

const fetchMarkers = () => {
 
    const coordinate = {latitude: 65.06254, longitude: 25.46997};
    setMarkers([
    ...markers,
    {
    key: markers.length + 1,
    coordinate: coordinate
    }
    ]);
}
// 

const FetchHardMarkers = () => {
  const coordinate = {latitude: 65.06254, longitude: 24.56997};
  setMarkers([
  ...markers,
  {
  key: markers.length + 1,
  coordinate: coordinate
  }
  ]);


}

const FetchMediumMarkers = () => {

  const coordinate = {latitude: 65.06254, longitude: 25.56997};
  setMarkers([
  ...markers,
  {
  key: markers.length + 1,
  coordinate: coordinate
  }
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
