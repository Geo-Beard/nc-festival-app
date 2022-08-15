import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// SCREENS:
import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";
import PersonalTimetableScreen from "./screens/PersonalTimetableScreen";
import UploadPhotoScreen from "./screens/UploadPhotoScreen";
import DatabaseTest from "./screens/DatabaseTest";
// NAVIGATION:
const Stack = createNativeStackNavigator();
import TabNavigator from "./TabNavigator";

export default function App() {
  return (
    <>
      <NavigationContainer>

        <Stack.Navigator initialRouteName="Profile" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="UploadPhoto" component={UploadPhotoScreen} />
          <Stack.Screen name="PersonalTimetable" component={PersonalTimetableScreen} />
          <Stack.Screen name="Profile" component={TabNavigator} />
          <Stack.Screen name="Test" component={DatabaseTest} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
