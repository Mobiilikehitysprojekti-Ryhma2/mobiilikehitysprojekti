import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AchievementsScreen from "../screens/AchievementsScreen";
import CommunityScreen from "./CommunityScreen";

const Tab = createBottomTabNavigator();

export default function Navbar() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Etusivu") {
              iconName = "home";
            } else if (route.name === "Yhteisö") {
              iconName = "people";
            } else if (route.name === "Saavutukset") {
              iconName = "trophy";
            } else if (route.name === "Profiili") {
              iconName = "person";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Etusivu" component={HomeScreen} />
        <Tab.Screen name="Yhteisö" component={CommunityScreen} />
        <Tab.Screen name="Saavutukset" component={AchievementsScreen} />
        <Tab.Screen name="Profiili" component={ProfileScreen} />
      </Tab.Navigator>
  );
}
