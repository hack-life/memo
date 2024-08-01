import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from "@/constants/Colors";
import { useNavigation } from 'expo-router';

const { width, height } = Dimensions.get('window');

const activeDay = ['2024-08-01','2024-08-02', '2024-08-03', '2024-08-04', '2024-08-06']

function Leaderboard() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.header}>
        <FontAwesome5 
          name="chevron-left" 
          size={24} 
          color={Colors.purple1 }
          onPress={() => navigation.navigate("Home")} 
          style={styles.backIcon} 
        />
        <Text style={styles.headerTitle}>Leaderboard</Text>
      </View>
    </SafeAreaView>
  );
}

export default Leaderboard;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.black1,
    padding: 16,
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
    color: Colors.purple1,
  },
});
