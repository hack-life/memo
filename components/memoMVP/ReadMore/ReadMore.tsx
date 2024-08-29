import { Text, View, StyleSheet } from "react-native";

import ArticleList from "./ArticleList";
import { Divider } from "@rneui/themed";

import { Colors } from "@/constants/Colors";
import { useFonts } from "expo-font";

function ReadMore({ articles }) {
  const [fontsLoaded] = useFonts({
    "Serif-Italic": require("@/assets/fonts/DMSerifText-Italic.ttf"),
    Serif: require("@/assets/fonts/DMSerifText-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null; // or some loading indicator
  }
  return (
    <View style={styles.container}>
      <Divider style={styles.divider} color={Colors.grey2} width={0.5} />
      <Text style={styles.text}>Read more</Text>
      <ArticleList articles={articles} />
    </View>
  );
}

export default ReadMore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  divider: {
    width: "90%",
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: "Serif",
    color: Colors.white1,
    textAlign: "center",
  },
});
