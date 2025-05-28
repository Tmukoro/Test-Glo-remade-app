import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { setBackgroundColorAsync } from 'expo-system-ui';
import * as NavigationBar from 'expo-navigation-bar'
import { Platform } from 'react-native';


import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import HomeScreen from './HomeScreen';
import ProfileSetupScreen from './ProfileSetupScreen';
import HomePageScreen from './HomePageScreen';
import HomeScreen2 from './HomeScreen2';
import NotificationScreen from './NotificationScreen';
import HelpSupportScreen from './HelpSupportScreen';
import SettingScreen from './SettingScreen';
import ProfileinfoScreen from './ProfileInfoScreen';
import AritePurchaseScreen from './AirtimePurchaseScreen';

const Stack = createNativeStackNavigator();


export default function App() {
      
  useEffect(()=>{
    if(Platform.OS === 'android'){
      setBackgroundColorAsync('black');
      NavigationBar.setBackgroundColorAsync('black');
      NavigationBar.setButtonStyleAsync('light');
    }
}, []);



  return (


          <PaperProvider>

            <NavigationContainer>

              <Stack.Navigator initialRouteName="HomeScreen">

              <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown: false}} ></Stack.Screen>
              <Stack.Screen name='Sign up' component={SignUpScreen}></Stack.Screen>
              <Stack.Screen name='Login' component={LoginScreen}></Stack.Screen>
              <Stack.Screen name='Psetup' component={ProfileSetupScreen} options={{headerShown: false}}></Stack.Screen>
              <Stack.Screen name='Hps' component={HomePageScreen} options={{headerShown: false}}></Stack.Screen>
              <Stack.Screen name='HomeScreen2' component={HomeScreen2} options={{headerShown: false}}></Stack.Screen>
              <Stack.Screen name='Notification' component={NotificationScreen} options={{headerShown: false}}></Stack.Screen>
              <Stack.Screen name ='Support' component={HelpSupportScreen} options={{headerShown: false}}></Stack.Screen>
              <Stack.Screen name='Settings' component={SettingScreen} options={{headerShown: false}}></Stack.Screen>
              <Stack.Screen name='Account Info' component={ProfileinfoScreen} 
              options={{headerStyle:{backgroundColor: '#409439'}, headerTitleStyle: {fontWeight: 'bold', color: 'white'}, headerTintColor: 'white'}}
              ></Stack.Screen>
              <Stack.Screen name='Buy Airtime' component={AritePurchaseScreen} options={{headerStyle:{backgroundColor: '#409439'}, headerTitleStyle: {fontWeight: 'bold', color: 'white'}, headerTintColor: 'white'}}></Stack.Screen>


              </Stack.Navigator>

            </NavigationContainer>
            
          </PaperProvider>


 
  );
}


