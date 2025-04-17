import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart, BarChart } from "react-native-gifted-charts"
import { getDistance } from 'geolib';
import { Colors } from "../theme/colors";

export default function DataScreen({ navigation }) {

  const [walkedRoute, setWalkedRoute] = useState([]);
  const [movementData, setMovementData] = useState([]);


useEffect(() => {
  const loadWalkedRoute = async () => {
    try {
      const stored = await AsyncStorage.getItem('walkedRoute');
      const locations = stored ? JSON.parse(stored) : [];
      setWalkedRoute(locations);
    } catch (err) {
      console.error('Error loading route:', err);
    }
  };

  loadWalkedRoute();
}, []);

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
    if (walkedRoute.length > 0) {
      calculateDistancePerDay(walkedRoute);
    }
  }, [walkedRoute]);


  


  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
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
        barStyle={{ backgroundColor: '#006A66' }}
      />
   <Button title="Palaa Karttasivulle" onPress={() => navigation.navigate('Home')} color='#4A6361'/>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    fontSize: 18,
  },
 

});
