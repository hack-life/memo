import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import Carousel from "@/components/memoMVP/carousel/carousel";
import { useContext, useEffect, useState } from "react";
import IconButton from "@/components/memoMVP/UI/IconButton";
import { AuthContext } from "@/store/auth-context";
import WisdomBar from "@/components/memoMVP/Gamification/wisdomBar";
import Streaks from "@/components/memoMVP/Gamification/Streaks";
import SwipableDeck from "@/components/memoMVP/carousel/SwipableDeck";

interface Articles {
  title: string;
  content: string; // Changed from string[] to string
}

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

  return (
    <View style={styles.wrapper}>
      <View style={styles.topContainer}>
        <WisdomBar wisdomScore={0.75} />
        <Streaks dayCount={5} />
      </View>
      <View style={styles.carouselOuter}>
        <SwipableDeck articles={articles} />
      </View>
      <View style={styles.bottomContainer}>
        <IconButton
          icon="logout"
          size={24}
          color={Colors.purple1}
          onPress={authCtx.logout}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.black1,
  },
  carouselOuter: {
    flex: 1,
    backgroundColor: Colors.black1,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 5,
    padding: 5,
  },
  topContainer: {
    flexDirection: "row",
  },
});
