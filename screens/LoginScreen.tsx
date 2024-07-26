import { useContext, useState } from 'react';
import { Alert, ImageBackground, StyleSheet, View, Text, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';

import LoadingOverlay from '../components/memoMVP/UI/LoadingOverlay';
import { AuthContext } from '@/store/auth-context';
import { login } from '@/util/auth';
import AuthContent from '@/components/memoMVP/Auth/AuthContent';
import { Colors } from '@/constants/Colors';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('screen');

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  const [fontsLoaded] = useFonts({
    'Serif-Italic': require('@/assets/fonts/DMSerifText-Italic.ttf'),
    'Serif': require('@/assets/fonts/DMSerifText-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or a loading indicator while fonts are loading
  }

  const authContentHeight = deviceHeight * 0.7; // Adjust as needed

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <ImageBackground
      source={require('@/assets/images/MyImages/noise.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.textBox}>
          <Text style={styles.hey}>Hi!</Text>
          <Text style={styles.welcome}>Welcome to Memo</Text>
        </View>
        <View style={[styles.authContent, { height: authContentHeight }]}>
          <AuthContent isLogin onAuthenticate={loginHandler} />
        </View>
      </View>
    </ImageBackground>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center', // Pushes text to the top and AuthContent to the bottom
    paddingVertical: 20,
    
  },
  textBox: {
    alignItems: 'center',
    paddingTop: deviceHeight * 0.2, // Adjust as needed
   
  },
  hey: {
    fontSize: 50,
    fontFamily: 'Serif',
    color: Colors.white1,
  },
  welcome: {
    fontSize: 40,
    fontFamily: 'Serif',
    color: Colors.white1,
  },

});
