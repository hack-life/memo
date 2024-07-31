import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useFonts } from 'expo-font';
import { useNavigation } from 'expo-router';

function StreaksButton({ dayCount }) {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    'Serif-Italic': require('@/assets/fonts/DMSerifText-Italic.ttf'),
    'Serif': require('@/assets/fonts/DMSerifText-Regular.ttf'),
  });

  return (
    <Pressable
      onPress={() => navigation.navigate("StreaksScreens")}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? Colors.grey2 : Colors.grey1,
        },
        styles.Box,
      ]}
      >
      <View style={styles.innerContainer}>
        <MaterialIcons name="local-fire-department" size={35} color={Colors.purple1} />
        <Text style={styles.DayCount}>{dayCount}</Text>
      </View>
    </Pressable>
  );
}

export default StreaksButton;

const styles = StyleSheet.create({

    Box: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginRight: 10,
        
      },

    innerContainer: {
        flexDirection: 'row',
        alignItems: "center",
    },
    
  DayCount: {
    fontSize: 25,
    color: Colors.white1,
    fontFamily: 'Serif',
    
  },
});
