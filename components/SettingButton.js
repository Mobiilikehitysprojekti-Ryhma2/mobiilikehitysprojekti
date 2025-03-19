import React, { useState } from 'react'
import { Text, View, StyleSheet, Switch, Button } from 'react-native'
import NavigateButton from './NavigateButton'
import { Ionicons } from "@expo/vector-icons"

// Button for changing setting or navigating to other screes

// Usage <SettingsButton title={title} type={type} screenName={screenName} />
// title = name of the button
// iconName = name of the icon, uses Ionicons - icons
// type = type of the button.
// Possible: "switch" for a toggleswitch, "navigate" for a button to navigate to a different screen  

// if using "navigate":
// screenName = name of the screen to navigate to (e. "Home")


export default function SettingButton(props) {

    const [isEnabled, setIsEnabled] = useState(false)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState)

    return (
        <View style={styles.container}>
            <View style={styles.settingContainer}>
                <Ionicons name={props.iconName} size={32} />
                <Text style={styles.text}>{props.title}</Text>

                {props.type === "switch" &&
                    <Switch
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />}

                {props.type === "navigate" && <NavigateButton title={props.title} screenName={props.screenName} />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        paddingLeft: 12,
        paddingRight: 12,

    },
    text: {
        fontSize: 16,

    },

    settingContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        width: "100%",
        height: "auto",
        paddingTop: 16,
        paddingBottom: 16,
    }


});