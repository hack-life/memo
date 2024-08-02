import React, { useContext } from 'react';
import { Text, SafeAreaView, View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '@/store/auth-context';
import FlatButton from '@/components/memoMVP/UI/FlatButton';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useLoadFonts } from '@/hooks/useLoadFonts';
import ProfileDetails from '@/components/memoMVP/Profile/ProfileDetails';

function ProfileScreen() {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  const user_name = 'John'; // Replace with dynamic username

  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return null; // or some loading indicator
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 
          name="chevron-left" 
          size={30} 
          color={Colors.white1}
          onPress={() => navigation.goBack()} 
          style={styles.backIcon} 
        />
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/150' }} // Replace with user's profile picture URL
          style={styles.profileImage} 
        />
        <Text style={styles.welcomeMessage}>Welcome back, {user_name}!</Text>
      </View>

      <ProfileDetails />

      <View style={styles.buttonRow}>
        <FlatButton children={"Add friends"} onPress={() => {}} style={styles.button} />
        <FlatButton children={"x followers"} onPress={() => {}} style={styles.button} />
      </View>

      <View style={styles.footer}>
        <FlatButton children={"Log out"} onPress={authCtx.logout} style={styles.logoutButton} />
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row-reverse",
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  backIcon: {
    position: 'absolute',
    left: 16,
  },
  headerTitle: {
    fontSize: 35,
    color: Colors.purple1,
    fontFamily: "Serif",
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: "center",
    backgroundColor: Colors.grey1,
    padding: 20,
    marginVertical: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  welcomeMessage: {
    fontSize: 18,
    color: 'white',
    fontFamily: "Serif"
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    marginVertical: 16,
  },
  button: {
    marginHorizontal: 10,
    paddingHorizontal : 20,
    backgroundColor: Colors.grey1,
    borderRadius: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 15,
    left: 10,

    padding: 16,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: Colors.purple1,
    padding: 10,
    borderRadius: 20,
  },
});
