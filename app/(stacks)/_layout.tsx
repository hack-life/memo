import React from 'react';


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



import SignupScreen from '@/screens/SignupScreen';
import LoginScreen from '@/screens/LoginScreen';
import HomeScreen from '@/screens/index';
import ReadScreen from '@/screens/Read';
import MyStreaks from '@/screens/StreaksScreens/MyStreaks';
import Leaderboard from '@/screens/StreaksScreens/Leaderboard';
import ProfileScreen from '@/screens/ProfileScreen';

import { useContext, useEffect, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';


import AuthContextProvider, { AuthContext } from '@/store/auth-context';


const BottomTabs = createBottomTabNavigator();

function StreaksScreens(){
  return (
    <BottomTabs.Navigator  screenOptions={{headerShown: false,}}
     >
      <BottomTabs.Screen name="MyStreaks" component= {MyStreaks} />
      <BottomTabs.Screen name="Leaderboard" component= {Leaderboard} />
    </BottomTabs.Navigator>

  );
}

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false,}}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />

    </Stack.Navigator>
  );
}


function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);

  return (
    <Stack.Navigator
    screenOptions={{headerShown: false,}}>


      <Stack.Screen
        name="Home"
        component={HomeScreen}/>


      <Stack.Screen
        name="Read"
        component={ReadScreen}/>

      <Stack.Screen 
        name="StreaksScreens"
        component= {StreaksScreens} />

      <Stack.Screen
        name="Profile"
        component={ProfileScreen} />

      </Stack.Navigator>

        );
      }


function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <>
      {!authCtx.isAuthenticated ? <AuthStack /> : <AuthenticatedStack />}
    </>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}

export default function ScreenLayout() {
  
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}


