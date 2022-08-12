import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Button } from "react-native";
// SCREENS:
import SignupScreen from "./screens/SignupScreen";
import MapScreen from "./screens/MapScreen";
import PhotosScreen from "./screens/PhotosScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LoginScreen from "./screens/LoginScreen";
import TimetableScreen from "./screens/TimetableScreen";
import PersonalTimetableScreen from "./screens/PersonalTimetableScreen";
import UploadPhotoScreen from "./screens/UploadPhotoScreen";
import DatabaseTest from "./screens/DatabaseTest";
import FriendsScreen from "./screens/FriendsScreen";
import SettingsScreen from "./screens/SettingsScreen";
// NAVIGATION:
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
//ICONS:
import {FontAwesome, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';

export default function App() {
  return (
    <>
      <NavigationContainer>

        <Tab.Navigator initialRouteName="Profile">

          <Tab.Screen name="Map" component={MapScreen} 
            options={{
              tabBarLabel: ({focused, color}) => (<Text style={{color: focused ? 'black' : color}}>Map</Text>),
              tabBarIcon: ({size, color}) => (<FontAwesome name="map-marker" size={28} color="grey" />)
            }}
          />
          <Tab.Screen name="Timetable" component={TimetableScreen} options={{
            tabBarLabel: ({focused, color}) => (<Text style={{color: focused ? 'black' : color}}>Timetables</Text>),
            tabBarIcon: ({size, color}) => (<MaterialCommunityIcons name="timetable" size={30} color="grey" />)
          }}/>
          <Tab.Screen name="Photos" component={PhotosScreen} options={{
            tabBarLabel: ({focused, color}) => (<Text style={{color: focused ? 'black' : color}}>Photos</Text>),
            tabBarIcon: ({size, color}) => (<FontAwesome name="photo" size={26} color="grey" />)
          }}/>
          <Tab.Screen name="Friends" component={FriendsScreen} options={{
            tabBarLabel: ({focused, color}) => (<Text style={{color: focused ? 'black' : color}}>Friends</Text>),
            tabBarIcon: ({size, color}) => (<FontAwesome5 name="user-friends" size={24} color="grey" />)
          }}/>
          <Tab.Screen name="Profile" component={ProfileScreen} options={{
            tabBarLabel: ({focused, color}) => (<Text style={{color: focused ? 'black' : color}}>Me</Text>),
            tabBarIcon: ({size, color}) => (<FontAwesome5 name={"user-alt"} color={"grey"} size={27} />)
          }}/>

        </Tab.Navigator>

        {/* <Stack.Navigator initialRouteName="Profile">
          <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="UploadPhoto" component={UploadPhotoScreen} />
          <Stack.Screen name="PersonalTimetable" component={PersonalTimetableScreen} />
          <Stack.Screen name="Test" component={DatabaseTest} />
        </Stack.Navigator> */}

      </NavigationContainer>
    </>
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
