import React, { useState } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
    const [user, setUser] = useState({
        username: "käyttäjä1",
        fullName: "Etunimi Sukunimi",
        country: "Suomi",
        bio: "Moi",
        profilePic: "https://via.placeholder.com/150"
      });

  return (
    <View style={styles.container}>
<View style={styles.header}>
        <Text style={styles.title}>Profiili</Text>
        <Ionicons
          name="settings"
          size={30}
          color="black"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
      <View style={styles.profileCard}>
        <Image
          source={{ uri: 'https://example.com/profile.jpg' }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>Käyttäjätunnus</Text>
        <Text style={styles.name}>Etunimi Sukunimi</Text>
        <Text style={styles.bio}>Biografia: Moi</Text>
        <Text style={styles.country}>Maa: Suomi</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f2f2f2',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    profileCard: {
      marginTop: 20,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
      alignItems: 'center',
      backgroundColor:"#006A66"
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    username: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    name: {
      fontSize: 16,
      color: 'white',
    },
    bio: {
      fontSize: 14,
      textAlign: 'center',
      marginVertical: 10,
      color:"white"
    },
    country: {
      fontSize: 14,
      color: 'white',
    },
  });