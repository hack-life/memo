import { SafeAreaView, StyleSheet, Dimensions, View } from "react-native";
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
  const deviceWidth = Dimensions.get('screen').width;
  const deviceHeight = Dimensions.get('screen').height;
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
   <SafeAreaView style={styles.safeArea}>
    <View style={[styles.topContainer, { height: deviceHeight * 0.08 }]}>
      <View style={styles.topContainer}>
        <WisdomBar wisdomScore={0.75} />
        <Streaks dayCount={5} />
      </View>
      <View style={[styles.deckContainer, { height: deviceHeight * 0.74 }]}>
        <SwipableDeck articles={articles} />
      </View>
      <View style={[styles.bottomContainer, { height: deviceHeight * 0.1 }]}>
        <IconButton icon='logout' size={24} color={Colors.purple2} onPress={authCtx.logout} />
      </View>
    </View>
   </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.black1,
  },
  wrapper: {
    flex: 1,
  },
  topContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.black1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        marginTop: 25,
        zIndex: 1, // Ensure it is below the deck
    },
    deckContainer: {
        zIndex: 1, // Ensure the deck is above both containers
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        backgroundColor: Colors.black1,
        zIndex: 1, // Ensure it is below the deck
    },
});
