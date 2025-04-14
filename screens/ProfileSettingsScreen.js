import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from "react"
import { Colors } from "../theme/colors"
import InfoEditor from '../components/InfoEditor'
import { getUserInfo, updateUserInfo } from "../helpers/UserInfo";

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

            <Text>Tilin asetukset</Text>

            <Text style={styles.userInfoText}>Muuta käytäjänimi:</Text>
            <InfoEditor
                info={currentUser.username}
                toUpdate={"username"}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                updateUserInfo={updateUserInfo}
                isUserName={true}
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
        paddingBottom: 16,
        textAlign: 'left',
        color: "black"
      }
});
