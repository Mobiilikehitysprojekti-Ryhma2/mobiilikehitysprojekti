import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme/colors"
import { getUserInfo, updateUserInfo } from "../helpers/UserInfo";
import InfoEditor from '../components/InfoEditor'

export default function ProfileSettingsScreen({ navigation }) {

    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUserInfo();
            setCurrentUser(userData);
        };

        fetchUser();
    }, []);


    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={42} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Tilin Asetukset</Text>
            </View>

            <Text style={styles.userInfoText}>Muuta käyttäjänimi:</Text>
            <InfoEditor
                info={currentUser.username}
                toUpdate={"username"}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                updateUserInfo={updateUserInfo}
            />

            <Text style={styles.userInfoText}>Muuta nimi:</Text>
            <InfoEditor
                info={currentUser.fullName}
                toUpdate={"fullName"}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                updateUserInfo={updateUserInfo}
            />

            <Text style={styles.userInfoText}>Muuta bio:</Text>
            <InfoEditor
                info={currentUser.bio}
                toUpdate={"bio"}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                updateUserInfo={updateUserInfo}
            />

            <Text style={styles.userInfoText}>Muuta maa:</Text>
            <InfoEditor
                info={currentUser.country}
                toUpdate={"country"}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                updateUserInfo={updateUserInfo}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 32,
        paddingBottom: 16,
        height: "100%",
        backgroundColor: Colors.background,
    },
    userInfoText: {
        fontSize: 18,
        paddingLeft: 16,
        paddingTop: 32,
        textAlign: 'left',
        color: "black"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
    },
    headerText: {
        flex: 1,
        textAlign: "center",
        fontSize: 40,
        color: Colors.onPrimaryContainer,
        fontFamily: "Exo_400Regular",
    },
});
