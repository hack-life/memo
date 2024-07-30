import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Summary from "./summary"; // Ensure the import path is correct
import { Colors } from "@/constants/Colors";

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

function Carousel({ title, summary1, summary2, summary3, length }) {
  const navigation = useNavigation();

  return (
    <View style={styles.carouselOuter}>
      <Pressable onPress={() => navigation.navigate("Read")}>
        <View style={styles.carouselInner}>
          <Image
            source={require("@/assets/images/MyImages/noise.jpg")}
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

const styles = StyleSheet.create({
  carouselOuter: {
    justifyContent: "center", // Center the carousel vertically
    alignItems: "center",
    backgroundColor: "transparent",
  },
  carouselInner: {
    width: deviceWidth * 0.88,
    backgroundColor: Colors.black2,
    borderRadius: 30,
    elevation: 15,
    shadowColor: Colors.grey2,
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10, /// to be changed
  },
  image: {
    width: "100%",
    height: deviceHeight * 0.15, // Adjust height relative to device height
    marginBottom: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 16,
    color: Colors.white1,
    alignSelf: "flex-start",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  summaryContainer: {
    alignSelf: "flex-start",
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  bottomCarousel: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 30,
    alignItems: "center",
  },
  leftText: {
    fontSize: 20,
    color: Colors.white1,
    fontStyle: "italic",
    padding: 5,
  },
  rightText: {
    fontSize: 20,
    color: Colors.black1,
    backgroundColor: Colors.grey2,
    fontStyle: "italic",
    borderRadius: 20,
    padding: 10,
  },
});

export default Carousel;
