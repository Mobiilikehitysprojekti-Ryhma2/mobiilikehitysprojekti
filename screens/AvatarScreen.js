import React, { useRef, useState } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera } from 'expo-camera';

export default function AvatarScreen({ navigation }) {

    const [facing, setFacing] = useState<CameraType>('back');
    const permissionResponse = useCameraPermissions();
const permission = permissionResponse?.[0];
const requestPermission = permissionResponse?.[1];
    const [photos, setPhotos] = useState([]);
    const cameraRef = useRef(null);



    if (!permission) {
      return <View />;
    }
  
    if (!permission.granted) {
      return (
        <View style={styles.container}>
          <Text style={styles.message}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }
    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
      }



const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotos((prev) => [photo.uri, ...prev]);
    }
  };










  return (
    <View>
<CameraView ref={cameraRef} style={styles.camera} facing={facing} />

<View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
    <Text style={styles.text}>Flip</Text>
  </TouchableOpacity>
  <TouchableOpacity style={[styles.button, styles.captureButton]} onPress={takePhoto}>
    <Text style={styles.text}>📸</Text>
  </TouchableOpacity>
</View>

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
    container: {
      flex: 1,
    },
    camera: {
      flex: 2,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
      backgroundColor: 'black',
    },
    button: {
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 8,
    },
    captureButton: {
      position: 'absolute',
      left: 10,
    },
    text: {
      color: 'black',
    },
    photoGrid: {
      padding: 10,
    },
    thumbnail: {
      width: 100,
      height: 100,
      margin: 5,
      borderRadius: 8,
    },
  });