import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from "@/constants/Colors";
import { useNavigation } from 'expo-router';

import DaysOfReading from '@/components/memoMVP/Gamification/DaysOfReading';
import StreaksCalendar from '@/components/memoMVP/StreaksCalendar';
import WisdomBar from '@/components/memoMVP/Gamification/wisdomBar';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');

const activeDay = ['2024-08-01','2024-08-02', '2024-08-03', '2024-08-04', '2024-08-06']

function MyStreaks() {
  const navigation = useNavigation();


  const [fontsLoaded] = useFonts({
    'Serif-Italic': require('@/assets/fonts/DMSerifText-Italic.ttf'),
    'Serif': require('@/assets/fonts/DMSerifText-Regular.ttf'),
  });

  if (!fontsLoaded) {
      return null; // or some loading indicator
  }


  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <FontAwesome5 
          name="chevron-left" 
          size={30} 
          color={Colors.white1 }
          onPress={() => navigation.navigate("Home")} 
          style={styles.backIcon} 
        />
        <Text style={styles.headerTitle}>My Streaks</Text>
      </View>

      <View style={styles.topBox}>

        <View style={styles.textContainer}>
          <Text style={styles.streaksText}>100</Text>
          <Text style={styles.DayStreaksText}>Day Streaks !</Text>
        </View>

        <View style={styles.streaksContainer}>
          <MaterialIcons name="local-fire-department" size={70} color={Colors.purple1} />
        </View>
      </View>

      <View style={styles.WisdomBox}>
        <WisdomBar wisdomScore={0.7}/>
      </View>

      <View  style={styles.MonthStreaks}>
        <DaysOfReading streaksNb={5} />
      </View>
  
      <StreaksCalendar activeDay={activeDay}/>



    </SafeAreaView>
  );
}

export default MyStreaks;

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
    marginTop: 15,
   
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

  topBox: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.grey1,
    padding: 20,
    marginVertical: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30
  },

  textContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    marginLeft: 50,
    

  },

  streaksContainer: {
    marginRight: 50,
  },

  streaksText: {
    fontSize: 50,
    color: Colors.white1,
    fontFamily: "Serif",
  },

  DayStreaksText: {
    fontFamily: "Serif-Italic",
    color: Colors.grey2,
    opacity: 0.9
  },

  WisdomBox: {
    alignItems: "center",
    marginBottom: 20,
    

  },


  date: {
    fontSize: 20,
    color: Colors.white1,
  },

  MonthStreaks: {
    alignItems: "flex-end",
    marginTop: 20,
    marginRight: 25
    
  }
});
