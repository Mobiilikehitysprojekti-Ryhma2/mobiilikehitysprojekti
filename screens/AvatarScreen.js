import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Image, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import uuid from "react-native-uuid"
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImageManipulator from 'expo-image-manipulator';

export default function AvatarScreen({ navigation }) {
  const [cameraType, setCameraType] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photos, setPhotos] = useState([]);
  const cameraRef = useRef(null);

  useEffect(() => {
    const loadPhotos = async () => {
      const saved = await AsyncStorage.getItem('savedPhotos');
      if (saved) {
        setPhotos(JSON.parse(saved));
      }
    };
  
    loadPhotos();
  }, []);

  if (!permission) {
    return <Text>Lupa käyttää kameraa...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Anna lupa käyttää kameraa</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  const toggleCameraType = () => {
    setCameraType((prevType) => (prevType === 'back' ? 'front' : 'back'));
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const start = Date.now();
      try {
        const photoData = await cameraRef.current.takePictureAsync({
          skipProcessing: true,
        });
  
        const resized = await ImageManipulator.manipulateAsync(
          photoData.uri,
          [{ resize: { width: 200, height: 200 } }],
          { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
        );
  
      
        const fileName = `${uuid.v4()}.jpg`; 
        const newPath = `${FileSystem.documentDirectory}${fileName}`;
  
        await FileSystem.moveAsync({
          from: photoData.uri,
          to: newPath,
        });

        const updatedPhotos = [newPath, ...photos];
        setPhotos(updatedPhotos);
  
        await AsyncStorage.setItem('savedPhotos', JSON.stringify(updatedPhotos));
      } catch (err) {
        console.error("error:", err);
      }
    }
  };

  const selectAvatar = async (uri) => {
    try {
      await AsyncStorage.setItem('selectedAvatar', uri);
      alert('Avatar valittu!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

//

  return (
    <View style={{ flex: 1 }}>
      <CameraView style={{ flex: 1 }} facing={cameraType} ref={cameraRef}>
        <View style={styles.cameraContent}>
        <TouchableOpacity style={[styles.button, styles.captureButton]} onPress={() => takePhoto()}>
          <Text style={styles.text}>📸</Text>
        </TouchableOpacity>
          
          <Button title="Toggle Camera" onPress={toggleCameraType} />
        </View>
      </CameraView>
      <Button title="Palaa karttasivulle" onPress={() => navigation.navigate('Home')} />
      <FlatList
        data={photos}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.photoGrid}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => selectAvatar(item)}>
      <Image source={{ uri: item }} style={styles.thumbnail} />
    </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContent: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 30,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  photoGrid: {

  },
  thumbnail: {
    width: 100,
    height: 100,
    margin: 5,
  },
});