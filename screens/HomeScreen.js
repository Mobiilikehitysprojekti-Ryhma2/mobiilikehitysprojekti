import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, Button, Modal, StatusBar, Animated, Easing } from "react-native";
import { useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Camera } from 'react-native-maps';
import * as Location from 'expo-location';
import { Marker, Polyline } from 'react-native-maps';
import { Snackbar } from 'react-native-paper';
import RoutefinderModal from "../components/RoutefinderModal";
import { getDistance } from 'geolib';
import uuid from "react-native-uuid"
import TopAppBar from "../components/TopAppBar";
import MapSettingsModal from "../components/MapSettingsModal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAvatar } from '../helpers/useAvatar';
import Weatherinfo from "../components/weatherInfo";
import ConfettiCannon from 'react-native-confetti-cannon'



export default function HomeScreen({ navigation }) {


  const [markers, setMarkers] = useState([]);
  const [finishedMarkers, setFinishedMarkers] = useState([])
  //const origin = {latitude: 65.03439, longitude: 25.2803};

  // const destination = {latitude: 65.0345, longitude: 25.2851};
  const [isAppOptionsModalVisible, setIsAppOptionsModalVisible] = useState(false);
  const [isRoutefinderModalVisible, setIsRoutefinderModalVisible] = useState(false);
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);
  const [totalDistance, setTotalDistance] = useState([]);
  const mapRef = useRef(null);
  const PROXIMITY_THRESHOLD = 30; //metriä 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [mapSettingsModalVisible, setMapSettingsModalVisible] = useState(false)
  const [mapType, setMapType] = useState("hybrid");

  const [showPolyline, setShowPolyline] = useState(true)



  const avatarUri = useAvatar();

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
    fetchWalkedRoute();
    saveMarkersToStorage(markers, finishedMarkers)
  }, [markers]);


  const fetchWalkedRoute = async () => {

    const route = await loadWalkedRoute();
    //console.log(route)
    const today = new Date().toISOString().split('T')[0];
    const todayRoute = route.filter(point => {
      const pointDate = new Date(point.timestamp).toISOString().split('T')[0];
      return pointDate === today;
    });
    //console.log(todayRoute)
    setPolylineCoordinates(todayRoute);

  }

  useEffect(() => {
    if (finishedMarkers.length > 0 && markers.length < 1) {

      setShowSnackbar(true)
      setShowConfetti(true)

      setTimeout(() => {
        setShowConfetti(false)
        setShowSnackbar(false)
      }, 10000);
    }
  }, [finishedMarkers]);


  useEffect(() => {
    let subscription;

    const locationCheck = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied');
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 500,
          distanceInterval: 1,
        },
        async (newLocation) => {
          const coords = newLocation.coords;
          setLocation(coords);
          await saveLocationToAsyncStorage(newLocation);

          setMarkers((currentMarkers) => {
            const newMarkers = [];
            let foundMarker = null;

            currentMarkers.forEach((marker) => {
              const distance = getDistance(
                { latitude: coords.latitude, longitude: coords.longitude },
                { latitude: marker.latitude, longitude: marker.longitude }
              );

              if (distance < PROXIMITY_THRESHOLD && !foundMarker) {
                foundMarker = marker;
              } else {
                newMarkers.push(marker);
              }
            });

            if (foundMarker) {
              setFinishedMarkers((prevFinished) => [
                ...prevFinished,
                { id: foundMarker.id, latitude: foundMarker.latitude, longitude: foundMarker.longitude }
              ]);
              setSelectedMarker(foundMarker);
              setIsModalVisible(true);
            }

            return newMarkers;
          });

          if (mapRef.current) {
            mapRef.current.animateCamera(
              {
                center: {
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                },
                pitch: 90,
                zoom: 17,
              },
              zoomRange
            );
          }
        }
      );

    };

    locationCheck();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const clearLocationAsyncStorage = async () => {
    try {
      console.log("clear location")
      await AsyncStorage.removeItem('walkedRoute')
    } catch (error) {
      console.error('Error catch', error)
    }
  }

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

  const saveMarkersToStorage = async (finishedMarkers, markers) => {
    try {
      await AsyncStorage.setItem('finishedMarkers', JSON.stringify(finishedMarkers));
      await AsyncStorage.setItem('remainingMarkers', JSON.stringify(markers));
      console.log('Markers saved');
    } catch (error) {
      console.error('Failed to save markers:', error);
    }
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
      //console.log(locations);
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
        setShowPolyline={setShowPolyline}
        clearLocationAsyncStorage={clearLocationAsyncStorage}
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
          zoom: 17,
        }}
        showsUserLocation={true}
        followUserLocation={true}
        showsCompass={false}
        showsBuildings={true}
        pitchEnabled={false}
        showsMyLocationButton={true}
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
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={{ height: 40, width: 40, borderRadius: 20, borderWidth: 2 }} />
          ) : (
            <Text>No avatar selected</Text>
          )}



        </Marker>
        {markers.map((item, index) => (
          <React.Fragment key={item.id || index}>
            <Marker
              key={item.id}
              title={"Marker " + index}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude
              }}
            />
          </React.Fragment>
        ))}

        {/* Finished markers */}
        {finishedMarkers.map((item, index) => (
          <React.Fragment key={item.id || index}>
            <Marker
              key={item.id}
              title={"Marker " + index}
              pinColor="#7cfc00"
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude
              }}
            />
          </React.Fragment>
        ))}


        {polylineCoordinates.length > 0 && showPolyline && (
          <Polyline
            coordinates={polylineCoordinates}
            strokeColor="red"
            strokeWidth={4}
          />
        )}



      </MapView>
      <View style={{
        position: 'absolute',
        top: 130,
        left: 6,
        backgroundColor: '#222222',
        padding: 8,
        borderRadius: 8,
        zIndex: 10,
      }}>

        {location && <Weatherinfo location={location} />}
      </View>
      <Snackbar
        visible={isModalVisible}
        onDismiss={handleModalClose}
        duration={7000}
        style={{ backgroundColor: '#555555', position: "absolute", bottom: 80 }}
      >
        {`Markkeri löydetty: Lat ${selectedMarker?.latitude.toFixed(4)}, Lon ${selectedMarker?.longitude.toFixed(4)}`}
      </Snackbar>


      <Snackbar
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        duration={10000}
        style={{ backgroundColor: '#6A0DAD', position: "absolute", bottom: 180, alignItems: "center" }}
      >
        <Text style={{ textAlign: 'center', width: '100%', color: 'white' }}>
          🎉 Reitti suoritettu! 🎉
        </Text>
      </Snackbar>

      {showConfetti && (
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          fadeOut={true}
          explosionSpeed={350}
          fallSpeed={2500}
        />
      )}

      <Button
        title="Reittivalikko"
        onPress={() => setIsAppOptionsModalVisible(!isAppOptionsModalVisible)}
        color="#4A6361"
      />
      {isAppOptionsModalVisible && (

        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Button title="Reset" onPress={onReset} color="#4A6361" />
            <Button title="Reitti" onPress={openRoutefinderModal} color="#4A6361" />
            <Button title="Demo esitystä varten" onPress={Matkatesti} color="red" />

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
  modalContainer: {
    backgroundColor: '#006A66',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#006A66',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  }

});
