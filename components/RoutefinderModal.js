import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import uuid from "react-native-uuid"
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/Config";
import { Picker } from "@react-native-picker/picker";

const RoutefinderModal = ({ visible, closeModal, markers, setMarkers }) => {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedRouteMarkers, setSelectedRouteMarkers] = useState([]);

  useEffect(() => {
    console.log("toimiiko edes")
    

    fetchRoutes(); 
  }, []);

  const handleRouteChange = (value) => {
    setSelectedRoute(value);  
  };

  const fetchRoutes = async () => {
    try {
      //console.log(firestore)
      const routesRef = collection(firestore, "routes");
      const snapshot = await getDocs(routesRef);
  
      const routes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRoutes(routes); 
    } catch (error) {
      console.error("Error fetching routes: ", error);
    }
  };



  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Select a Route</Text>

          <Picker
            selectedValue={selectedRoute}
            onValueChange={handleRouteChange}
          >
            <Picker.Item label="Select a Route" value={null} />
            {routes.map((route, index) => (
              <Picker.Item key={index} label={route.name} value={route.id} />
            ))}
          </Picker>

          <Button title="Close" onPress={closeModal} />
        </View>
      </View>
    </Modal>
  );
};
  
  const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "blue", 
    },
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
