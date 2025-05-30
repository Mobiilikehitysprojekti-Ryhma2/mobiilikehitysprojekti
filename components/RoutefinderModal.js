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
   // console.log("markers:", route?.markers); 
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
      //console.log("Markerit ", routes);
      setRoutes(routes); 
      setError(null);
    } catch (error) {
      console.error("Error: ", error);
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
      <Text style={styles.title}>Valitse reitti</Text>
        <View style={styles.modalContent}>
          

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
              <Picker.Item label="Valitse reitti" value={null} />
              {routes.map((route, index) => (
                <Picker.Item key={index} label={route.name + " " + route.difficulty} value={route.id} />
              ))}
              
            </Picker>
          )}

          
        </View>
        <Button title="Sulje" onPress={closeModal} style={{alignItems: 'flex-end'}}/>
      </View>
    </Modal>
  );
};
  
  const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#006A66", 
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
      color: 'white'
    },
  });









  export default RoutefinderModal;
