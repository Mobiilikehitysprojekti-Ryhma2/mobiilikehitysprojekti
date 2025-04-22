import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart, BarChart } from "react-native-gifted-charts"
import { getDistance } from 'geolib';
import { Colors } from "../theme/colors";

export default function DataScreen({ navigation }) {

  const [walkedRoute, setWalkedRoute] = useState([]);
  const [movementData, setMovementData] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);

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

//voi lisätä napin mistä valita vuosi miltä liikkuminen näytetään
  const calculateDistancePerMonth = (locations) => {
    const distancePerMonth = {};
    let total = 0;

    for (let i = 1; i < locations.length; i++) {
      const prevLocation = locations[i - 1];
      const currentLocation = locations[i];
      const distance = getDistance(
        { latitude: prevLocation.latitude, longitude: prevLocation.longitude },
        { latitude: currentLocation.latitude, longitude: currentLocation.longitude }
      );
      const date = new Date(currentLocation.timestamp);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      const monthKey = `${month} ${year}`;
  
      if (!distancePerMonth[monthKey]) {
        distancePerMonth[monthKey] = 0;
      }
      distancePerMonth[monthKey] += distance;
      total += distance;
    }
    
    const chartData = Object.keys(distancePerMonth).map((monthkey) => ({
      label: monthkey,
      value: distancePerMonth[monthkey] / 1000, // metri/kilometri
    }));

    setMovementData(chartData);
    setTotalDistance(total);
  };

  useEffect(() => {
    if (walkedRoute.length > 0) {
      calculateDistancePerMonth(walkedRoute);
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
      <Text style={styles.text}>Kuljettu kokonaismatka {(totalDistance / 1000).toFixed(2)} km</Text>
   <Button title="Palaa Karttasivulle" onPress={() => navigation.navigate('Home')} color='#4A6361'/>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    fontSize: 18,
  },
 text: {
  alignItems: 'center',
  flexDirection: 'row',
  padding: 20,
 },

});
