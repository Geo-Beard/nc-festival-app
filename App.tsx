import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import PersonalTimetableScreen from "./screens/PersonalTimetableScreen"
import UploadPhotoScreen from './screens/UploadPhotoScreen';
import DatabaseTest from './screens/DatabaseTest'
import LandingScreen from './screens/LandingScreen';
// NOTIFICATION MESSAGES:
import FlashMessage from 'react-native-flash-message';
// NAVIGATION:
const Stack = createNativeStackNavigator();
import TabNavigator from "./TabNavigator";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Signup" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="UploadPhoto" component={UploadPhotoScreen} />
          <Stack.Screen name="PersonalTimetable" component={PersonalTimetableScreen} />
          <Stack.Screen name="Profile" component={TabNavigator} />
          <Stack.Screen name="Test" component={DatabaseTest} />
          <Stack.Screen name="Landing" component={LandingScreen} />
        </Stack.Navigator>
        <FlashMessage position="top"/>
      </NavigationContainer>
    </>
  );
}
