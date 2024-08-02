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
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

function Card({ title, summary1, summary2, summary3, length }) {
  const navigation = useNavigation();

  return (
    <View style={styles.carouselOuter}>
      <Pressable onPress={() => navigation.navigate("Read")}>
        <View style={styles.carouselInner}>
          <Image
            source={require("@/assets/images/MyImages/purpleNoise.jpg")}
            style={styles.image}
          />
          <View>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {title}
            </Text>
          </View>
          <View style={styles.summaryContainer}>
            <Summary text={summary1} />
            <Summary text={summary2} />
            <Summary text={summary3} />
          </View>
          <View style={styles.bottomCarousel}>
            <Text style={styles.Time}>{length}</Text>
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
    height: deviceHeight * 0.55, // Set a fixed height for the outer container
  },
  carouselInner: {
    width: deviceWidth * 0.9,
    height: "100%", // Make sure the inner container fills the outer container
    backgroundColor: Colors.black2,
    borderRadius: 30,
    elevation: 15,
    shadowColor: Colors.black2,
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5, 
  },
  image: {
    width: "100%",
    height: deviceHeight * 0.12, // Adjust height relative to device height
    marginBottom: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: RFPercentage(3.5), // Responsive font size
    fontWeight: "bold",
    marginBottom: 2,
    color: Colors.white1,
    alignSelf: "flex-start",
    marginLeft: 10,
    marginRight: 10,
  },
  summaryContainer: {
    alignSelf: "flex-start",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 6,
    
  },
  bottomCarousel: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: "center",
    position: 'absolute',
    bottom: 5, // Adjust as needed for padding at the bottom
  },
  Time: {
    fontSize: RFPercentage(2.5), // Responsive font size
    color: Colors.black1,
    backgroundColor: Colors.grey2,
    fontStyle: "italic",
    borderRadius: 30,
    padding: 10,
  },
});

export default Card;
