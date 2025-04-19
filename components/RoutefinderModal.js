import { View, Text, Button, Modal, StyleSheet, Select } from 'react-native';
import React, { useState, useEffect } from 'react';
import uuid from "react-native-uuid"
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/Config";
import { Picker } from '@react-native-picker/picker';

const RoutefinderModal = ({ visible, closeModal, markers, setMarkers }) => {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedRouteMarkers, setSelectedRouteMarkers] = useState([]);
  const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);



  const handleRouteChange = (value) => {
    setSelectedRoute(value); 
    const route = routes.find(r => r.id === value);
    console.log("markers:", route?.markers); 
    const selected = routes.find((r) => r.id === value);
  if (selected?.markers) {
    setMarkers(selected.markers); 
  }
  };

  useEffect(() => {
  const fetchRoutes = async () => {
    setLoading(true);
    try {
      //console.log(firestore)
      const routesRef = collection(firestore, "routes");
      const snapshot = await getDocs(routesRef);
  
      const routes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("Markerit ", routes);
      setRoutes(routes); 
      setError(null);
    } catch (error) {
      console.error("Error fetching routes: ", error);
      setError("Failed to load routes");
    } finally {
      setLoading(false);
    }
  };

  fetchRoutes();
}, []);



  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Select a Route</Text>

          {loading && <Text>Loading routes...</Text>}
          {error && <Text style={{ color: 'red' }}>{error}</Text>}

          {!loading && !error && (
            <Picker
              selectedValue={selectedRoute}
              onValueChange={handleRouteChange}
              style={{
                height: 50,
                width: "50%",
                backgroundColor: "#f0f0f0", 
                color: "#000",              
                marginBottom: 20,
              }}
            >
              <Picker.Item label="Select a Route" value={null} />
              {routes.map((route, index) => (
                <Picker.Item key={index} label={route.name} value={route.id} />
              ))}
              <Picker.Item label="Testi 1" value="test1" />
              <Picker.Item label="Testi 2" value="test2" />
            </Picker>
          )}

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
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      marginBottom: 10,
    },
  });









  export default RoutefinderModal;
