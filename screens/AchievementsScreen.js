import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { loadWalkedRoute, calculateTotalDistance } from '../components/WalkedRoute';
import AsyncStorage from '@react-native-async-storage/async-storage';

const achievementsList = [
  { type: 'distance', distance: 10, value: 10, label: '🏆 10 km seikkailua!' },
  { type: 'distance', distance: 50, value: 50, label: '🏆🏆 50 km seikkailua!' },
  { type: 'distance', distance: 100, value: 100, label: '🏆🏆🏆 100 km seikkailua!' },
  { type: 'distance', distance: 500, value: 500, label: '🏆🏆🏆🏆 500 km seikkailua!' },
  { type: 'distance', distance: 1000, value: 1000, label: '🏆🏆🏆🏆 1000 km seikkailua!' },
];
//1000km liian kunnianhimoista jo? vai pistänkö vielä enemmän saavutuksia.
//vai pienemmillä matkamäärillä saavutuksia?
const dayAchievements = [
  { type: 'days', days: 1, value: 1, label: '🚶 Ensimmäinen päivä seikkailua!' },
  { type: 'days', days: 5, value: 5, label: '🚶🚶 5 päivää seikkailua!' },
  { type: 'days', days: 10, value: 10, label: '🚶🚶🚶 10 päivää seikkailua!' },
  { type: 'days', days: 30, value: 30, label: '🚶🚶🚶🚶 30 päivää seikkailua!' },
  { type: 'days', days: 90, value: 90, label: '🚶🚶🚶🚶🚶 90 päivää seikkailua!' },
  { type: 'days', days: 365, value: 365, label: '🚶🚶🚶🚶🚶🚶 365 päivää seikkailua!' },
];



//pitäisi oikeastaan siirtää saavutukset firebaseen ja sieltä noutaa aina tiedot
export default function AchievementsScreen() {
  const [totalDistanceKm, setTotalDistanceKm] = useState(0);
  const [newAchievement, setNewAchievement] = useState(null);
  const [allAchievements, setAllAchievements] = useState([]);
  const [dayCount, setDayCount] = useState(0);
  const nextAchievement = achievementsList.find(a => a.value > totalDistanceKm)
const progressToNext = nextAchievement
  ? (totalDistanceKm / nextAchievement.distance) * 100
  : 100;

  const trackLoginDate = async () => {
    try {
      const stored = await AsyncStorage.getItem('walkedRoute');
      const data = stored ? JSON.parse(stored) : [];
      const uniqueDates = new Set();
  
      data.forEach(point => {
        if (point.timestamp) {
          const date = new Date(point.timestamp).toISOString().split('T')[0];
          uniqueDates.add(date);
        }
      });
      const activeDayCount = uniqueDates.size;
      setDayCount(activeDayCount);
      //console.log("päivät", activeDayCount);
    } catch (err) {
      console.error("error:", err);
    }
  };

  useEffect(() => {
    trackLoginDate();
    //console.log("d1",activeDayCount)
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      const locations = await loadWalkedRoute();
      const distanceInMeters = calculateTotalDistance(locations);
      const distanceInKm = distanceInMeters / 1000;
      setTotalDistanceKm(distanceInKm);
  
      const earnedDistance = achievementsList.filter(a => distanceInKm >= a.value);
      const earnedDays = dayAchievements.filter(a => dayCount >= a.value);
  
      //console.log('d2:', dayCount);
  
      const allEarned = [...earnedDistance, ...earnedDays];
      setAllAchievements(allEarned);
      //console.log('a1:', allEarned);
  
      const newOnes = allEarned.filter(e => !stored.find(s => s.label === e.label));
  
      if (newOnes.length > 0) {
        setNewAchievement(newOnes[newOnes.length - 1]);
    
      }
    };
    fetchData();
  }, [dayCount]);

  const distanceAchievements = allAchievements.filter(a => a.type === 'distance');
const dayAchievementsList = allAchievements.filter(a => a.type === 'days');
//console.log(allAchievements)


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saavutuksesi</Text>
      {nextAchievement && (
  <Text style={{ marginTop: 10 }}>
    📈 {progressToNext.toFixed(1)}% vielä jäljellä että saat saavutuksen {nextAchievement.label}
  </Text>
)}
      <Text>Kävelty kokonaismatka: {totalDistanceKm.toFixed(2)} km</Text>

      {newAchievement ? (
        <Text style={[styles.achievement, styles.new]}>
          🥇 Uusi saavutus avattu: {newAchievement.label}
        </Text>
      ) : (
        <Text style={styles.achievement}>Jatka liikkumista avataksesi saavutuksia!</Text>
      )}

<Text style={styles.subTitle}> Matkasaavutukset</Text>
  <View style={styles.list}>
  {achievementsList.map((a, i) => {
    const unlocked = allAchievements.some(e => e.label === a.label);
    return (
      <Text
        key={`d-${i}`}
        style={unlocked ? styles.unlocked : styles.locked}
      >
        {unlocked ? `✅ ${a.label}` : `❌ ${a.label}`}
      </Text>
    );
  })}
  </View>

  <Text style={styles.subTitle}> Päiväsaavutukset</Text>
  <View style={styles.list}>
  {dayAchievements.map((a, i) => {
    const unlocked = allAchievements.some(e => e.label === a.label);
    return (
      <Text
        key={`t-${i}`}
        style={unlocked ? styles.unlocked : styles.locked}
      >
        {unlocked ? `✅ ${a.label}` : `❌ ${a.label}`}
      </Text>
    );
  })}
  </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  achievement: {
    fontSize: 18,
    marginTop: 20,
  },
  new: {
    color: 'gold',
    fontWeight: 'bold',
  },
  list: {
    marginTop: 30,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  unlocked: {
    fontSize: 16,
    color: '#000', 
    marginBottom: 5,
  },
  locked: {
    fontSize: 16,
    color: 'gray', 
    opacity: 0.6,
    marginBottom: 5,
  },
});