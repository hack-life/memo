import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '@/constants/Colors';


import SignupScreen from '@/screens/SignupScreen';
import LoginScreen from '@/screens/LoginScreen';
import HomeScreen from '@/screens/index';
import ReadScreen from '@/screens/Read';

import { useContext, useEffect, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';


import AuthContextProvider, { AuthContext } from '@/store/auth-context';

// What you need to install :
// npm install axios
// npm install expo-app-loading
// npm install @react-native-async-storage/async-storage
// npm install @react-navigation/stack 
// npm install react-native-progress --save
// npm install react-native-deck-swiper --save
// expo install expo-font
// npm install react-native-paper
// npm install @expo/vector-icons
// npm install react-native-elements @rneui/themed





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
    screenOptions={{headerShown: false,}}
    >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      />


        <Stack.Screen
              name="Read"
              component={ReadScreen}
             
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


