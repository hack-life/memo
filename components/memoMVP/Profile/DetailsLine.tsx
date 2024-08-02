
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useLoadFonts } from '@/hooks/useLoadFonts';

function DetailsLine({ subsection, info }) {

    const fontsLoaded = useLoadFonts();

    if (!fontsLoaded) {
      return null;
    }
  

  return (
    <View style={styles.container}>
      <Text style={styles.subsection}>{subsection}</Text>
      <Text style={styles.info}>{info}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  subsection: {
    flex: 1,
    fontSize: 18,
    color: Colors.purple1,
    borderRadius: 5,
    marginRight: 3,
    fontFamily: "Serif",
  },
  info: {

    color: Colors.white1,
    borderRadius: 5,
    fontFamily: "Serif",
    fontSize: 17,
  },
});

export default DetailsLine;
