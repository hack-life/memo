import React from "react";
import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Summary from "./summary"; // Ensure the import path is correct
import { Colors } from "@/constants/Colors";

function Carousel({ title, summary1, summary2, summary3, length }) {
  const navigation = useNavigation();

  return (
    <View style={styles.carouselOuter}>
      <Pressable onPress={() => navigation.navigate("Read")}>
        <View style={styles.carouselInner}>
          <Image
            source={require("@/assets/images/MyImages/Kamala.jpeg")}
            style={styles.image}
          />

          <View>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.summaryContainer}>
            <Summary text={summary1} />
            <Summary text={summary2} />
            <Summary text={summary3} />
          </View>
          <View style={styles.bottomCarousel}>
            <Text style={styles.rightText}>{length}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default Carousel;

const styles = StyleSheet.create({
  carouselOuter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselInner: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.black2,
    margin: 20,

    borderRadius: 30,

    shadowColor: Colors.white1,
    shadowOpacity: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  image: {
    width: "100%",
    height: "25%",
    marginBottom: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 16,
    color: Colors.white1,
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  summaryContainer: {
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  bottomCarousel: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: "center",
  },
  leftText: {
    alignSelf: "flex-start",
    fontSize: 20,
    color: Colors.white1,
  },
  rightText: {
    alignSelf: "flex-end",
    fontSize: 20,
    color: Colors.white1,
  },
});
