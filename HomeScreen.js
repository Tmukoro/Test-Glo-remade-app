import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons"
import { setBackgroundColorAsync } from 'expo-system-ui';
import SignUpScreen from "./SignUpScreen";
import LoginScreen from "./LoginScreen";


const Tab = createBottomTabNavigator();

export default function HomeScreen(){

    useEffect(()=>{
        setBackgroundColorAsync('black')
    }, []);

    return(
        <Tab.Navigator
        screenOptions={({route}) =>({
            tabBarIcon : ({focused, color, size}) =>{
                let iconfig;

                if(route.name === 'Sign Up'){
                    iconfig = focused ? 'person-add' : "person-add-outline";
                }else if(route.name === 'Login'){
                    iconfig = focused ? 'log-in' : "log-in-outline";
                }
                
                return <Ionicons name={iconfig} color={color} size={size}></Ionicons>
            },
            
            
            tabBarInactiveTintColor: 'grey',
            tabBarActiveTintColor: 'green',
        })}>
            <Tab.Screen name="Sign Up" component={SignUpScreen} options={{headerStyle:{backgroundColor: '#409439'}, headerTitleStyle: {fontWeight: 'bold', color: 'white'}, headerTintColor: 'white'}}></Tab.Screen>
            <Tab.Screen name="Login" component={LoginScreen} options={{headerStyle:{backgroundColor: '#409439'}, headerTitleStyle: {fontWeight: 'bold', color: 'white'}, headerTintColor: 'white'}}></Tab.Screen>
        </Tab.Navigator>
    )

}