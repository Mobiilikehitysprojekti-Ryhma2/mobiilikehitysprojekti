import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, Button, SafeAreaView, Modal } from "react-native";
import { useEffect, useRef } from 'react';
import MapView, { Camera } from 'react-native-maps';
import * as Location from 'expo-location';
import {Marker, Polyline} from 'react-native-maps';
import { FAB } from 'react-native-paper';
import RoutefinderModal from "../components/RoutefinderModal";

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [camera, setCamera] = useState('')
  const [markers, setMarkers] = useState([]);
  //const origin = {latitude: 65.03439, longitude: 25.2803};
 // const destination = {latitude: 65.0345, longitude: 25.2851};
 const [isAppOptionsModalVisible, setIsAppOptionsModalVisible] = useState(false);
 const [isRoutefinderModalVisible, setIsRoutefinderModalVisible] = useState(false);
 const [polylineCoordinates, setPolylineCoordinates] = useState([]);
 const mapRef = useRef(null);


  const [location, setLocation] = useState({
      latitude: 65.0100,
      longitude: 25.4719,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
        
        useEffect(() => {
          (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
            
          
            const locationCheck = await Location.watchPositionAsync(
              {
                accuracy: Location.Accuracy.High, 
                timeInterval: 1000, 

              },
              (newLocation) => {
                setLocation(newLocation.coords);

                if (mapRef.current) {
                  mapRef.current.animateCamera({
                    center: {
                      latitude: newLocation.coords.latitude,
                      longitude: newLocation.coords.longitude,
                    },
                    pitch: 90,
                    heading: 0,
                    zoom: 15,
                  } )


                }
              }
            );
            return () => locationCheck.remove();
          })();
        }, []);
  

        const handleLongPress = (e) => {
          const coordinate = e.nativeEvent.coordinate;
          setMarkers([
          ...markers,
          {
          key: markers.length + 1,
          coordinate: coordinate
          }
          ]);
        };

        const onReset = () => {
          setMarkers([]);
          setPolylineCoordinates([]);

        };
     


        const openRoutefinderModal = () => {
          setIsAppOptionsModalVisible(false); 
          setIsRoutefinderModalVisible(true);
        };

        const toggleAppOptions = () => {
          setShowAppOptions(prevState => !prevState);
        };
        const openAppOptionsModal = () => {
          setShowAppOptions(true);
        };
     

        const Matkatesti = () => {
        
          setPolylineCoordinates([
            { latitude: 65.06254, longitude: 25.46997 },
            { latitude: 65.06293, longitude: 25.46756 },
            { latitude: 65.06464, longitude: 25.46799 },
            { latitude: 65.06462, longitude: 25.47168 },
            { latitude: 65.06424, longitude: 25.47498 },
            { latitude: 65.06282, longitude: 25.47494 },
          ]);
        };

  return ( <SafeAreaView style={{ flex: 1 }}>
    
    <MapView
        style={{ flex: 1 }}
        mapType="hybrid"
        ref={mapRef}
        showsUserLocation={true}
        followUserLocation={true}
        showsCompass={false}
        showsBuildings={true}
        pitchEnabled={false}
        showsMyLocationButton={true}
        onLongPress={handleLongPress}
        zoomEnabled={true}
        zoomControlEnabled={false}
        scrollEnabled={true}
      >

<Marker  coordinate={{
        latitude: location.latitude,
        longitude: location.longitude
        }}
        title="Oma sijainti"
        >
<Image source={require('../images/marker.png')} style={{height: 40, width: 40 }} />

</Marker>
{markers.map((marker) => (
          <Marker
            key={marker.key}
            coordinate={marker.coordinate}
          />
        ))}
{polylineCoordinates.length > 0 && (
          <Polyline
            coordinates={polylineCoordinates}
            strokeColor="red"
            strokeWidth={4}
          />
        )}

</MapView>
<Button
        title="Show Options"
        onPress={() => setIsAppOptionsModalVisible(!isAppOptionsModalVisible)}
      />
{isAppOptionsModalVisible && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Button title="Reset" onPress={onReset} />
            <Button title="Reitti" onPress={openRoutefinderModal} />
            <Button title="kuljettumatkatesti" onPress={Matkatesti} />
     
          </View>
        </View>
      )}
       <RoutefinderModal
        visible={isRoutefinderModalVisible}
        closeModal={() => setIsRoutefinderModalVisible(false)}
        markers={markers}
        setMarkers={setMarkers}
      />  
   
    
    

  </SafeAreaView>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 20,
  backgroundColor: '#006A66',
},
searchBar: {
  height: 40,
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 8,
  paddingLeft: 10,
  marginBottom: 20,
  backgroundColor:"white"
},
content: {
  fontSize: 18,
}, map: {
  height: '100%',
  width: '100%'
},
routeContainer: {
  position: 'absolute',
  height: 40,
  bottom: 40,
},
optionsRow: {
  alignItems: 'center',
  flexDirection: 'row',
},
});
