import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from "react-native";
import {FontAwesome, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';

import MapScreen from "./screens/MapScreen";
import TimetableScreen from "./screens/TimetableScreen";
import PhotosScreen from "./screens/PhotosScreen";
import FriendsScreen from "./screens/FriendsScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {

    return (

        <Tab.Navigator initialRouteName="ProfileTab" screenOptions={{headerShown: false}} >

            <Tab.Screen name="Map" component={MapScreen} options={{
                tabBarLabel: ({focused, color}) => (<Text style={{color: focused ? 'black' : color}}>Map</Text>),
                tabBarIcon: ({size, color}) => (<FontAwesome name="map-marker" size={28} color="grey" />)
            }}/>
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
            <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{
                tabBarLabel: ({focused, color}) => (<Text style={{color: focused ? 'black' : color}}>Me</Text>),
                tabBarIcon: ({size, color}) => (<FontAwesome5 name={"user-alt"} color={"grey"} size={25} />)
            }}/>

        </Tab.Navigator>

    )

}