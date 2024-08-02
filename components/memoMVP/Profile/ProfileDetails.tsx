
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DetailsLine from './DetailsLine';
import { Colors } from '@/constants/Colors';
import { useLoadFonts } from '@/hooks/useLoadFonts';


function ProfileDetails() {

    const fontsLoaded = useLoadFonts();

    if (!fontsLoaded) {
        return null; // or some loading indicator
    }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Details</Text>
      <DetailsLine subsection="Email Address" info="john.doe@example.com" />
      <DetailsLine subsection="Date Joined" info="2023-07-15" />
      <DetailsLine subsection="Number of Streaks" info="10" />
      <DetailsLine subsection="Wisdom Score" info="75%" />
      <DetailsLine subsection="Number of Friends" info="5" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey1,
    padding: 16,
    borderRadius: 10,
    marginVertical: 16,
    width: "90%",
    alignSelf: 'center',
  },
  title: {
    fontSize: 23,
    color: Colors.white1,
    fontFamily: "Serif",
    marginBottom: 16,
    textAlign: "center",
  },
});

export default ProfileDetails;
