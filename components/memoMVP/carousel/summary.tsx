import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useFonts } from "expo-font";
import { RFPercentage } from "react-native-responsive-fontsize";

function Summary({ text, numberOfLines, ellipsizeMode }: {
  text: string;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}) {
  const [fontsLoaded] = useFonts({
    "Serif-Italic": require("@/assets/fonts/DMSerifText-Italic.ttf"),
    Serif: require("@/assets/fonts/DMSerifText-Regular.ttf"),
  });

  return (
    <View style={styles.outerContainer}>
      <Text numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode} style={styles.text}>{text}</Text>
    </View>
  );
}


export default Summary;

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  
  text: {
    fontSize: RFPercentage(2),
    color: Colors.white1,
    marginTop: 5,
    fontFamily: "Serif",
  },
});
