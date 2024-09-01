import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import SignupScreen from '@/screens/auth/SignupScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import HomeScreen from '@/screens/index';
import ReadScreen from '@/screens/Read';
import MyStreaks from '@/screens/StreaksScreens/MyStreaks';
import Leaderboard from '@/screens/StreaksScreens/Leaderboard';
import ProfileScreen from '@/screens/ProfileScreen';

import AuthContextProvider, { AuthContext } from '@/store/auth-context';
import { Colors } from '@/constants/Colors';

const BottomTabs = createBottomTabNavigator();

function StreaksScreens() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.purple1,
      }}
    >
      <BottomTabs.Screen
        name="MyStreaks"
        component={MyStreaks}
        options={{ tabBarLabel: 'Personal' }}
      />
      <BottomTabs.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{ tabBarLabel: 'Friends' }}
      />
    </BottomTabs.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Read" component={ReadScreen} />
      <Stack.Screen name="StreaksScreens" component={StreaksScreens} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />;
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = authCtx.onAuthStateChanged((user) => {
      if (user) {
        authCtx.setUser(user);
        user.getIdToken().then((token) => {
          authCtx.setToken(token);
        });
      }
      setIsTryingLogin(false);
    });

    return () => unsubscribe();
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
