import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDistance } from 'geolib';

export const loadWalkedRoute = async () => {
  try {
    const stored = await AsyncStorage.getItem('walkedRoute');
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error('Error loading route:', err);
    return [];
  }
};

export const calculateTotalDistance = (locations) => {
  let total = 0;
  for (let i = 1; i < locations.length; i++) {
    const prev = locations[i - 1];
    const curr = locations[i];
    total += getDistance(
      { latitude: prev.latitude, longitude: prev.longitude },
      { latitude: curr.latitude, longitude: curr.longitude }
    );
  }
  return total; 
};