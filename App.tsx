import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View, Button } from "react-native";
import SignupScreen from "./screens/SignupScreen";
import MapScreen from "./screens/MapScreen";
import PhotosScreen from "./screens/PhotosScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LoginScreen from "./screens/LoginScreen";
import TimetableScreen from "./screens/TimetableScreen";
import PersonalTimetableScreen from "./screens/PersonalTimetableScreen";
import UploadPhotoScreen from "./screens/UploadPhotoScreen";
//notification message
import FlashMessage from "react-native-flash-message";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Photos">
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Photos" component={PhotosScreen} />
        <Stack.Screen name="UploadPhoto" component={UploadPhotoScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Timetable" component={TimetableScreen} />
        <Stack.Screen
          name="PersonalTimetable"
          component={PersonalTimetableScreen}
        />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
