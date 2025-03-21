import React from "react"
import { TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "../theme/colors";

// Button can be used to navigate within the app as in
// <NavigateButton title="title" iconName="iconName" screenName="ScreenName"/>

// title = label of the button
// screenName = what screen it should

const NavigateButton = (props) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      title={props.title ? props.title : props.screenName}
      onPress={() => navigation.navigate(props.screenName)}
    >
      <Ionicons name="chevron-forward-outline" size={32} color={Colors.onPrimaryContainer} />
    </TouchableOpacity>
  )
}



export default NavigateButton;
