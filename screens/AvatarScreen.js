import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Image, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function AvatarScreen({ navigation }) {
  const [cameraType, setCameraType] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photos, setPhotos] = useState([]);
  const cameraRef = useRef(null);


  if (!permission) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
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
      
      cameraRef.current
        ?.takePictureAsync({
          skipProcessing: true,
        })
        .then((photoData) => {
 
          console.log(`Delay after takePictureAsync: ${Date.now()- start} ms`);
 
          setPhotos((prev) => [photoData.uri, ...prev]);
        });
    }
  };
//
 /*
 try {
      const photo = await ref.takePictureAsync();
      setPhotos((prev) => [photo.uri, ...prev]);
    } catch (e) {
      console.error('Error:', e);
    }
 
 
 */
  return (
    <View style={{ flex: 1 }}>
      <CameraView style={{ flex: 1 }} facing={cameraType} ref={cameraRef}>
        <View style={styles.cameraContent}>
        <TouchableOpacity style={[styles.button, styles.captureButton]} onPress={() => takePhoto()}>
          <Text style={styles.text}>📸</Text>
        </TouchableOpacity>
          <Text style={styles.text}>Take picture</Text>
          <Button title="Toggle Camera" onPress={toggleCameraType} />
        </View>
      </CameraView>
      <FlatList
        data={photos}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.photoGrid}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.thumbnail} />
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