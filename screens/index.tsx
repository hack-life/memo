import { SafeAreaView, StyleSheet, Dimensions, View, ScrollView } from "react-native";
import { Colors } from "@/constants/Colors";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "@/store/auth-context";
import WisdomBar from "@/components/memoMVP/Gamification/wisdomBar";
import Streaks from "@/components/memoMVP/Gamification/Streaks";
import Carousel from "@/components/memoMVP/Carousel/carousel";

import IconButtonAnt from "@/components/memoMVP/UI/IconButtonAnt";
import ReadMore from "@/components/memoMVP/ReadMore/ReadMore";

interface Articles {
  title: string;
  content: string; // Changed from string[] to string
}

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

export default function HomeScreen() {
  const authCtx = useContext(AuthContext);
  const [articles, setArticles] = useState<Articles[]>([]);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        // Directly require the JSON file
        const articlesJson = require("../assets/articles.json");

        // If articlesJson is already an array, use it directly
        const articlesArray = Array.isArray(articlesJson)
          ? articlesJson
          : articlesJson.articles;

        const parsedArticles: Articles[] = articlesArray.map(
          (article: any) => ({
            title: article.title,
            content: Array.isArray(article.content)
              ? article.content.join(" ") // Joining array into a single string
              : article.content, // Using directly if it's already a string
          })
        );
        setArticles(parsedArticles);
      } catch (error) {
        console.error("Failed to load articles:", error);
      }
    };
    loadArticles();
  }, []);

    useEffect(() => {
    const loadArticles = async () => {
      try {
        // Directly require the JSON file
        const articlesJson = require("../assets/articles.json");

        // If articlesJson is already an array, use it directly
        const articlesArray = Array.isArray(articlesJson)
          ? articlesJson
          : articlesJson.articles;

        const parsedArticles: Articles[] = articlesArray.map(
          (article: any) => ({
            title: article.title,
            content: Array.isArray(article.content)
              ? article.content.join(" ") // Joining array into a single string
              : article.content, // Using directly if it's already a string
          })
        );
        setArticles(parsedArticles);
      } catch (error) {
        console.error("Failed to load articles:", error);
      }
    };
    loadArticles();
  }, []);

  const articlesAllJson = require("../assets/articlesAll.json");


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.wrapper}>

        <View style={styles.header}>
          <WisdomBar wisdomScore={0.60} />
          <Streaks dayCount={5} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.deckContainer}>
            <Carousel articles={articles} />
          </View>

          <View>

            <ReadMore articles={articlesAllJson}/>

          </View>

        </ScrollView>

        <View style={styles.fixedButton}>
          <IconButtonAnt name="pluscircle" size={48} color={Colors.purple1} />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: Colors.error1,
  },
  wrapper: {
    flex:1,
    backgroundColor: Colors.error2,
  },
  header: {
    flexDirection: "row",
    backgroundColor: Colors.black1,
    alignItems: "center",
    marginHorizontal: 5,
    justifyContent: "center",
    padding: 10,
    height: deviceHeight * 0.08,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  deckContainer: {
    height: deviceHeight * 0.74,
  },
  fixedButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
});
