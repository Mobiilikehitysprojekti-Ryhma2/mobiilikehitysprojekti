import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, Button, SafeAreaView } from "react-native";
import { useEffect, useRef } from 'react';
import MapView, { Camera } from 'react-native-maps';
import * as Location from 'expo-location';
import {Marker} from 'react-native-maps';
import { FAB } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [camera, setCamera] = useState('')
  const [location, setLocation] = useState({
      latitude: 65.0100,
      longitude: 25.4719,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
        
        useEffect(() => {
        (async() =>{
          getUserPosition()
        })()
          
        }, [])
  
      const handleSearchChange = (text) => {
        setSearch(text);
      };
  
      const getUserPosition = async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          try {
            if (status !== 'granted') {
              console.log('Permission denied');
              return;
            }
        
            const position = await Location.getCurrentPositionAsync({
              accuracy: Location.Accuracy.High,
            });
            setLocation({
              ...location,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            setCamera({
  ...camera,
  pitch: 90,
  heading: 0,
            zoom: 20,
  
            })
   
          } catch (error) {
            console.log(error);
          }
        };











  return ( <SafeAreaView style={{ flex: 1 }}>
    
    <MapView
        style={{ flex: 1 }}
        mapType="hybrid"
        camera={{
          center: {
            latitude: 65.010,
            longitude: 25.4719,
          },
          pitch: 90, 
          heading: 0,
          zoom: 15, 
        }}
        showsUserLocation={true}
        followUserLocation={true}
        showsCompass={false}
        showsBuildings={true}
        pitchEnabled={false}
      >

<Marker  coordinate={{
        latitude: location.latitude,
        longitude: location.longitude
        }}
        title="Oma sijainti"
        >
<Image source={require('../images/marker.png')} style={{height: 40, width: 40 }} />

</Marker>
</MapView>
<TextInput
      style={styles.searchBar}
      placeholder="Hae..."
      value={search}
      onChangeText={handleSearchChange}
    />
    
    <Text style={styles.content}>Hakutulokset</Text>
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
}
});
