import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SettingsScreen from "./screens/SettingsScreen";
import Navbar from "./components/bottomNavBar";
import { Colors } from "./theme/colors";
import { StatusBar } from "expo-status-bar";
import DataScreen from "./screens/DataScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { AuthProvider } from "./context/AuthContext";
import FriendsScreen from "./screens/FriendsScreen";
import SearchUsersScreen from "./screens/SearchUsersScreen";
import ChatScreen from "./screens/ChatScreen"
import RecentCommentsScreen from "./screens/RecentCommentsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={Colors.onPrimaryFixed} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={Navbar} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Data" component={DataScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Friends" component={FriendsScreen} />
          <Stack.Screen name="Search Users" component={SearchUsersScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Recent Comments" component={RecentCommentsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
