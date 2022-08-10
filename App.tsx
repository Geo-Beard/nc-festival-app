import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { db } from './firebase-config/firebase-config';
import SignupScreen from './screens/SignupScreen';
import MapScreen from './screens/MapScreen';
import PhotosScreen from './screens/PhotosScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import TimetableScreen from './screens/TimetableScreen';
import PersonalTimetableScreen from "./screens/PersonalTimetableScreen"
import { UserContext } from "./context/userContext"
import DatabaseTest from './screens/DatabaseTest'
import { useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null)
  return (
    <UserContext.Provider value={user}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Timetable">
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Photos" component={PhotosScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Timetable" component={TimetableScreen} />
        <Stack.Screen name="PersonalTimetable" component={PersonalTimetableScreen} />
        <Stack.Screen name="Test" component={DatabaseTest} />
        
      </Stack.Navigator>
    </NavigationContainer>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
