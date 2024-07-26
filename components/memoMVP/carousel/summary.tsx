import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

function Summary({ text }) {
  return (
    <View style={styles.outerContainer}>
      <Text style={styles.text}>{text}</Text>
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
  icon: {
    marginRight: 8,
    color: Colors.purple2,
    marginTop: 20,
    marginLeft: 10,
  },
  text: {
    fontSize: 20,
    color: Colors.white1,
    marginTop: 20,
  },
});
