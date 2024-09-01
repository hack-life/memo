import { useContext, useState } from 'react';
import { Alert, ImageBackground, StyleSheet, View, Text, Dimensions, Button } from 'react-native';
import { useFonts } from 'expo-font';

import LoadingOverlay from '@/components/memoMVP/UI/LoadingOverlay';
import { AuthContext } from '@/store/auth-context';
import { login, loginWithGoogle, getUserData } from '@/util/auth';
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
      const user = await login(email, password);
      // Firebase automatically triggers onAuthStateChanged and updates AuthContext.
      const userData = await getUserData(user.uid);
      // Handle any post-login logic or navigation here
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );
      setIsAuthenticating(false);
    }
  }
  

  async function googleLoginHandler() {
    setIsAuthenticating(true);
    try {
      const user = await loginWithGoogle();
      const userData = await getUserData(user.uid);
      // Use userData as needed
    } catch (error) {
      Alert.alert('Google Login failed', 'Please try again later.');
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <ImageBackground
      source={require('@/assets/images/MyImages/purpleNoise.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.textBox}>
          <Text style={styles.hey}>Hi!</Text>
          <Text style={styles.welcome}>Welcome to Memo</Text>
        </View>
        <View style={{height: authContentHeight}}>
          <AuthContent isLogin onAuthenticate={loginHandler} />
          <Button title="Login with Google" onPress={googleLoginHandler} />
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
    justifyContent: 'center',
    paddingVertical: 20,
  },
  textBox: {
    alignItems: 'center',
    paddingTop: deviceHeight * 0.2,
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
