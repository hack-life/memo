import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '@/constants/Colors';


import SignupScreen from '@/screens/SignupScreen';
import LoginScreen from '@/screens/LoginScreen';
import HomeScreen from '@/screens/index';
import ReadScreen from '@/screens/explore';

import { useContext, useEffect, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';


import AuthContextProvider, { AuthContext } from '@/store/auth-context';
import axios from 'axios';

// What you need to install :
// npm install axios
// npm install expo-app-loading
// npm install @react-native-async-storage/async-storage
// npm install @react-navigation/stack 
// npm install react-native-progress --save
// npm install react-native-deck-swiper --save



const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.black1 },
        headerTintColor: Colors.grey1,
        contentStyle: { backgroundColor: Colors.black1 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}


function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.black1 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.white1 },
      }}
    >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}}/>


        <Stack.Screen
              name="Read"
              component={ReadScreen}
              options={{headerShown: false,}}
            />
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


