import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart, BarChart } from "react-native-gifted-charts"
import { getDistance } from 'geolib';
import { Colors } from "../theme/colors";

export default function DataScreen({ navigation }) {

  const [walkedRoute, setWalkedRoute] = useState([]);
  const [movementData, setMovementData] = useState([]);
  const loadWalkedRoute = async () => {
    try {
      const storedLocations = await AsyncStorage.getItem('walkedRoute');
      const locations = storedLocations ? JSON.parse(storedLocations) : [];
      setWalkedRoute(locations); 
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const calculateDistancePerDay = (locations) => {
    const distancePerDay = {};
    for (let i = 1; i < locations.length; i++) {
      const prevLocation = locations[i - 1];
      const currentLocation = locations[i];
      const distance = getDistance(
        { latitude: prevLocation.latitude, longitude: prevLocation.longitude },
        { latitude: currentLocation.latitude, longitude: currentLocation.longitude }
      );
      const date = new Date(currentLocation.timestamp).toISOString().split('T')[0];
      if (!distancePerDay[date]) {
        distancePerDay[date] = 0;
      }
      distancePerDay[date] += distance;
    }

    const chartData = Object.keys(distancePerDay).map((date) => ({
      x: date,
      y: distancePerDay[date] / 1000, // metri/kilometri
    }));

    setMovementData(chartData);
  };

  useEffect(() => {
   // console.log(movementData) //PALJON DATAA NOPEASTI KÄYTÄ VAROEN!!!!
    loadWalkedRoute();
    if (walkedRoute.length > 0) {
      calculateDistancePerDay(walkedRoute); 
    }
  }, [walkedRoute]);


  


  return (
    <View>
      <Text>Koko liikkuminen</Text>
      <BarChart
        data={movementData}
        width={350}
        height={250}
        barWidth={20}
        spacing={10}
        initialSpacing={20}
        xAxisLabelTextStyle={{ fontSize: 10 }}
        yAxisLabelTextStyle={{ fontSize: 10 }}
        isAnimated={true}
        showValueOnTopOfBar={true}
        barStyle={{ backgroundColor: 'white' }}
      />
   <Button title="Palaa karttasivulle" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}