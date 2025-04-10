import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, Button, Modal, StatusBar } from "react-native";
import { useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Camera } from 'react-native-maps';
import * as Location from 'expo-location';
import { Marker, Polyline } from 'react-native-maps';
import { FAB } from 'react-native-paper';
import RoutefinderModal from "../components/RoutefinderModal";
import { getDistance } from 'geolib';
import uuid from "react-native-uuid"
import TopAppBar from "../components/TopAppBar";
import MapSettingsModal from "../components/MapSettingsModal";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [camera, setCamera] = useState('')
  const [markers, setMarkers] = useState([]);
  const [finishedMarkers, setFinishedMarkers] = useState([])
  //const origin = {latitude: 65.03439, longitude: 25.2803};

  // const destination = {latitude: 65.0345, longitude: 25.2851};
  const [isAppOptionsModalVisible, setIsAppOptionsModalVisible] = useState(false);
  const [isRoutefinderModalVisible, setIsRoutefinderModalVisible] = useState(false);
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);
  const mapRef = useRef(null);
  const PROXIMITY_THRESHOLD = 50; //metriä 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [mapSettingsModalVisible, setMapSettingsModalVisible] = useState(false)
  const [mapType, setMapType] = useState("hybrid");

  const [location, setLocation] = useState({
    latitude: 65.0100,
    longitude: 25.4719,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })


  const zoomRange = {
    minCenterCoordinateDistance: 30,
    maxCenterCoordinateDistance: 100,
    animated: true,
  };

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

        async (newLocation) => {
         // console.log('New Location:', newLocation);
          setLocation(newLocation.coords);
          await saveLocationToAsyncStorage(newLocation);


          markers.forEach((marker) => {
            const distance = getDistance(

              { latitude: newLocation.coords.latitude, longitude: newLocation.coords.longitude },
              { latitude: marker.latitude, longitude: marker.longitude }
            );

            if (distance < PROXIMITY_THRESHOLD) {
              //console.log("markerlöytynyt")
              handleFoundMarker(marker)
              setSelectedMarker(marker);
              setIsModalVisible(true);
            }
          });

          if (mapRef.current) {
            mapRef.current.animateCamera({
              center: {
                latitude: newLocation.coords.latitude,
                longitude: newLocation.coords.longitude,
              },
              pitch: 90,
              heading: 0,
              zoom: 50,
            },
              zoomRange
            )
          }
        }
      );
      return () => locationCheck.remove();
    })();
  }, []);

  const saveLocationToAsyncStorage = async (newLocation) => {
    try {
      const storedLocations = await AsyncStorage.getItem('walkedRoute');
      const locations = storedLocations ? JSON.parse(storedLocations) : [];
      const newLocationData = {
        latitude: newLocation.coords.latitude,
        longitude: newLocation.coords.longitude,
        timestamp: newLocation.timestamp,
      };
      locations.push(newLocationData);
      //console.log('array', locations);
      await AsyncStorage.setItem('walkedRoute', JSON.stringify(locations));
    } catch (error) {
      console.error('Error catch', error);
    }
  };

  const handleFoundMarker = (foundMarker) => {
    console.log("handleFoundMarker", foundMarker)
    setFinishedMarkers([...finishedMarkers, { id: foundMarker.id, latitude: foundMarker.latitude, longitude: foundMarker.longitude }])
    setMarkers(prevMarkers => prevMarkers.filter(marker => marker.id !== foundMarker.id));
    console.log("new markers set:", finishedMarkers, markers)
  }


  const handleLongPress = (e) => {
    const coordinate = e.nativeEvent.coordinate;
    const id = uuid.v4()
    setMarkers([...markers, { id: id, latitude: coordinate.latitude, longitude: coordinate.longitude }
    ]);
  };

  const onReset = () => {
    setMarkers([]);
    setPolylineCoordinates([]);

  };
  const handleModalClose = () => {
    setIsModalVisible(false);

  };


  const openRoutefinderModal = () => {
    setIsAppOptionsModalVisible(false);
    setIsRoutefinderModalVisible(true);
    loadWalkedRoute() //testi testi poistoon myöhemmin

  };

  const toggleAppOptions = () => {
    setShowAppOptions(prevState => !prevState);
  };
  const openAppOptionsModal = () => {
    setShowAppOptions(true);
  };

  const loadWalkedRoute = async () => {
    try {
      const storedLocations = await AsyncStorage.getItem('walkedRoute');
      const locations = storedLocations ? JSON.parse(storedLocations) : [];
      console.log(locations);
      return locations; // 
    } catch (error) {
      console.error('Error', error);
      return [];
    }
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

  return (

    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <TopAppBar
        setMarkers={setMarkers}
        setModalVisible={setMapSettingsModalVisible}
        markers={markers}
        location={location}
        finishedMarkers={finishedMarkers}
        setFinishedMarkers={setFinishedMarkers}
      />
      <MapView
        style={{ flex: 1 }}
        mapType={mapType}
        ref={mapRef}
        Camera={{
          center: {
            latitude: location.latitude,
            longitude: location.longitude,
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
        showsMyLocationButton={true}
        onLongPress={handleLongPress}
        zoomEnabled={true}
        zoomControlEnabled={false}
        scrollEnabled={true}
        cameraZoomRange={zoomRange}
      >

        <Marker coordinate={{
          latitude: location.latitude,
          longitude: location.longitude
        }}
          title="Oma sijainti"
        >
          <Image source={require('../images/marker.png')} style={{ height: 40, width: 40 }} />

        </Marker>
        {markers.map((item, index) => (

          <Marker
            key={item.id}
            title={"Marker " + index}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude
            }}
          />


        ))}

        {/* Finished markers */}
        {finishedMarkers.map((item, index) => (
          <Marker
            key={item.id}
            title={"Marker " + index}
            pinColor="#7cfc00"
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude
            }}
          />
        ))}


        {polylineCoordinates.length > 0 && (
          <Polyline
            coordinates={polylineCoordinates}
            strokeColor="red"
            strokeWidth={4}
          />
        )}

        {/* This adds the line between self added markers */}
        {markers.length > 0 && (
          <Polyline
            coordinates={[
              { latitude: location.latitude, longitude: location.longitude },
              ...markers.map((marker) => ({
                latitude: marker.latitude,
                longitude: marker.longitude,
              })),
            ]}
            strokeColor="red"
            strokeWidth={6}
          />
        )}

      </MapView>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleModalClose}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
            {selectedMarker && (
              <>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{`Marker ${selectedMarker.key}`}</Text>
                <Text>{`Latitude: ${selectedMarker.latitude}, Longitude: ${selectedMarker.longitude}`}</Text>
                <Button title="Close" onPress={handleModalClose} />
              </>
            )}
          </View>
        </View>
      </Modal>
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

      <MapSettingsModal
        modalVisible={mapSettingsModalVisible}
        setModalVisible={setMapSettingsModalVisible}
        setMapType={setMapType}
        currentMapType={mapType}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    fontSize: 18,
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
