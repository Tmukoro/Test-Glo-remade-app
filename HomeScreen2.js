import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from '@expo/vector-icons/AntDesign';
import { setBackgroundColorAsync } from "expo-system-ui";
import * as NavigationBar from 'expo-navigation-bar'
import { Platform } from "react-native";

import HomePageScreen from "./HomePageScreen";
import NotificationScreen from "./NotificationScreen";
import HelpSupportScreen from "./HelpSupportScreen";
import SettingScreen from "./SettingScreen";



const Tab = createBottomTabNavigator();

export default function HomeScreen2(){

    useEffect(()=>{
        if(Platform.OS === 'android'){
            setBackgroundColorAsync('black');
            NavigationBar.setBackgroundColorAsync('#000000');
            NavigationBar.setButtonStyleAsync('light');
        }
    }, []);

    return(
        <Tab.Navigator
        screenOptions={({route}) =>({
            tabBarIcon : ({focused, color, size}) =>{
                let iconfig;

                if(route.name === 'Home'){
                    iconfig = focused ? 'home' : "home-outline";
                }else if(route.name === 'Notification'){
                    iconfig = focused ? 'notifications' : "notifications-outline";
                }else if(route.name === 'Help & Support'){
                    return <AntDesign name="customerservice" size={size} color={color} />
                }else if(route.name === 'Settings'){
                    iconfig = focused ? 'settings' : 'settings-outline';
                }
                
                return <Ionicons name={iconfig} color={color} size={size}></Ionicons>
            },

            tabBarStyle: {backgroundColor: '#1F1F21'},
            tabBarInactiveTintColor: 'grey',
            tabBarActiveTintColor: '#61BF5A',
        })}>
            <Tab.Screen name="Home" component={HomePageScreen} options={{headerShown: false}}></Tab.Screen>
            <Tab.Screen name="Notification" component={NotificationScreen} options={{headerShown: false}}></Tab.Screen>
            <Tab.Screen name="Help & Support" component={HelpSupportScreen} options={{headerShown: false}}></Tab.Screen>
            <Tab.Screen name="Settings" component={SettingScreen} options={{headerShown: false}}></Tab.Screen>
        </Tab.Navigator>
    )

}