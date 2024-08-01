import React, { useContext } from 'react';
import { Text, SafeAreaView, View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '@/store/auth-context';
import FlatButton from '@/components/memoMVP/UI/FlatButton';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';


function ProfileScreen() {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  const user_name = 'Johnny'; // Replace with dynamic username

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 
          name="chevron-left" 
          size={24} 
          color={Colors.purple1 }
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

      <View style={styles.detailsSection}>
        <Text style={styles.detailsText}>Profile Details</Text>
      </View>

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  backIcon: {
    position: 'absolute',
    left: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E2E2E',
    padding: 16,
    borderRadius: 10,
    marginVertical: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  welcomeMessage: {
    fontSize: 18,
    color: 'white',
  },
  detailsSection: {
    backgroundColor: '#2E2E2E',
    padding: 16,
    borderRadius: 10,
    marginVertical: 16,
    alignItems: 'center',
  },
  detailsText: {
    fontSize: 16,
    color: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: '#3E3E3E',
    padding: 10,
    borderRadius: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#2E2E2E',
    padding: 16,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#3E3E3E',
    padding: 10,
    borderRadius: 10,
  },
});
