import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import IconButtonMat from '@/components/memoMVP/UI/IconButtonMat';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from "@/constants/Colors";
import { useNavigation } from 'expo-router';

import StreaksCalendar from '@/components/memoMVP/StreaksCalendar';
import WisdomBar from '@/components/memoMVP/Gamification/wisdomBar';

const { width, height } = Dimensions.get('window');

const activeDay = ['2024-08-01','2024-08-02', '2024-08-03', '2024-08-04', '2024-08-06']

function MyStreaks() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButtonMat
          icon="arrow-back-ios"
          size={40}
          color={Colors.white1}
          onPress={() => navigation.navigate("Home")}
        />
        <Text style={styles.title}>Streak</Text>
        <View style={styles.placeholder} />
      </View>
      
      <View style={styles.streaksContainer}>
        <Text style={styles.streaksText}>182</Text>
        <MaterialIcons name="local-fire-department" size={35} color={Colors.purple1} />
      </View>

      <WisdomBar wisdomScore={0.7}/>

  
      <StreaksCalendar activeDay={activeDay}/>
    </SafeAreaView>
  );
}

export default MyStreaks;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.grey1,
    
  },
  container: {
    flex: 1,
    backgroundColor: Colors.black1,
    padding: 16,
  },
  title: {
    fontSize: 30,
    color: Colors.purple1,
    textAlign: 'center',
    
  },
  placeholder: {
    width: 40, // To balance the space taken by the IconButton
  },
  streaksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.error1,
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
  },
  streaksText: {
    fontSize: 40,
    color: Colors.purple1,
  },
  calendar: {
    marginTop: 20,
  },

  date: {
    fontSize: 20,
    color: Colors.white1,
  }
});
