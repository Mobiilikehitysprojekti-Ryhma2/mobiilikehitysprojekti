import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

export default function MapSettingsModal({ modalVisible, setModalVisible, setMapType, currentMapType }) {
    const [selectedMapType, setSelectedMapType] = useState(currentMapType);

    useEffect(() => {
        setSelectedMapType(currentMapType);
    }, [modalVisible, currentMapType]);

    const mapTypes = ["standard", "satellite", "hybrid", "terrain"];
    const mapTypeNames = { 
        standard: "Oletus",
        satellite: "Satelliitti",
        hybrid: "Hybridi",
        terrain: "Maasto"
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Valitse kartan tyyppi</Text>


                    <RadioButton.Group 
                        onValueChange={newValue => setSelectedMapType(newValue)} 
                        value={selectedMapType}
                    >
                        {mapTypes.map((type) => (
                            <Pressable
                                key={type}
                                style={styles.radioContainer}
                                onPress={() => setSelectedMapType(type)}
                            >
                                <RadioButton value={type} />
                                <Text>{mapTypeNames[type]}</Text>
                            </Pressable>
                        ))}
                    </RadioButton.Group>

                    <Pressable
                        style={styles.button}
                        onPress={() => {
                            setMapType(selectedMapType)
                            setModalVisible(false)
                        }}
                    >
                        <Text style={styles.textStyle}>OK</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "white",
        padding: 20,
        alignItems: "center",
        width: 250,
        borderRadius: 10,
    },
    modalText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10
    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    button: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "blue",
        borderRadius: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold"
    }
});