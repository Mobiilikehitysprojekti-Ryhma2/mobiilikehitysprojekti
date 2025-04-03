import { StyleSheet, Text } from 'react-native'
import { React, useEffect, useState } from 'react'
import { Appbar } from "react-native-paper";
import { getDistance } from "geolib";

export default function TopAppBar({ markers, setMarkers, setModalVisible, location }) {

    const [distance, setDistance] = useState(0);

    useEffect(() => {
        calculateDistance(); 
    }, [markers, location]);

    const removeAllMarkers = () => {
        setMarkers([]);
        setDistance(0)
    };

    const toggleModal = () => {
        setModalVisible((prevState) => !prevState);
    };

    const calculateDistance = () => {
        if (markers.length > 0) {
            const userLocation = { latitude: location.latitude, longitude: location.longitude };

            let totalDistance = 0;
            let firstDistance = false;
            let prevMarker;
            markers.forEach((marker) => {
                if (!firstDistance) {
                    if (marker.coordinate.latitude && marker.coordinate.longitude) {
                        totalDistance += getDistance(userLocation, {
                            latitude: marker.coordinate.latitude,
                            longitude: marker.coordinate.longitude,
                        });

                        prevMarker = marker;
                        firstDistance = true;
                    } else {
                        console.log("error", markers);
                    }
                } else {
                    if (marker.coordinate.latitude && marker.coordinate.longitude) {
                        totalDistance += getDistance(marker.coordinate, prevMarker.coordinate);
                        prevMarker = marker;
                    }
                }
            });

            setDistance(totalDistance / 1000);

        }
    };

    return (
        <Appbar.Header>
            <Appbar.Action icon={"map-marker-remove-outline"} onPress={removeAllMarkers} />
            <Appbar.Action icon={"cog"} onPress={toggleModal} />
            <Text style={styles.distanceMeter}>{distance.toFixed(2)} km</Text>
        </Appbar.Header>
    );
}

const styles = StyleSheet.create({
    distanceMeter: {
        position: "absolute",
        right: 20,
        fontWeight: 600,
        fontSize: 18,
    }
});