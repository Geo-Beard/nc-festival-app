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
import { UserContext } from "./context/userContext"
import { useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null)
  return (
    <UserContext.Provider value={user}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Photos">
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Photos" component={PhotosScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
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
