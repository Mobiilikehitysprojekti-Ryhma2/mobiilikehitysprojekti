import { StyleSheet, Text } from 'react-native'
import { React, useEffect, useState } from 'react'
import { Appbar } from "react-native-paper";
import { getDistance } from "geolib";

export default function TopAppBar({ markers, setMarkers, setModalVisible, location, finishedMarkers, setFinishedMarkers }) {

    const [distance, setDistance] = useState(0);

    useEffect(() => {
        calculateDistance();
    }, [markers, location]);

    const removeAllMarkers = () => {
        setMarkers([]);
        setFinishedMarkers([]);
        setDistance(0)
    };
    const removeFoundAllMarkers = () => {
        setFinishedMarkers([]);
        console.log("Found / not Found:", finishedMarkers, markers)
    };

    const logMarkers = () => {
        console.log(markers)
        console.log(finishedMarkers)
    }

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
                    if (marker.latitude && marker.longitude) {
                        totalDistance += getDistance(userLocation, {
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        });

                        prevMarker = marker;
                        firstDistance = true;
                    } else {
                        console.log("error", markers);
                    }
                } else {
                    if (marker.latitude && marker.longitude) {
                        totalDistance += getDistance(marker, prevMarker);
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

            {/*
            Buttons for marker testing
            <Appbar.Action icon={"map-marker"} onPress={logMarkers} />    
            <Appbar.Action icon={"map"} onPress={removeFoundAllMarkers} />
             */}
             
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