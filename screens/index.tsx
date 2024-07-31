import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Text,
  Button,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useContext, useEffect, useState } from "react";
import IconButton from "@/components/memoMVP/UI/IconButton";
import { AuthContext } from "@/store/auth-context";
import WisdomBar from "@/components/memoMVP/Gamification/wisdomBar";
import Streaks from "@/components/memoMVP/Gamification/Streaks";
import SwipableDeck from "@/components/memoMVP/carousel/SwipableDeck";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { setLogLevel } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface Articles {
  title: string;
  content: string; // Changed from string[] to string
}

// enable logs
setLogLevel("debug");

export default function HomeScreen() {
  const deviceWidth = Dimensions.get("screen").width;
  const deviceHeight = Dimensions.get("screen").height;
  const authCtx = useContext(AuthContext);
  const [articles, setArticles] = useState<Articles[]>([]);

  
  const getArticles = async () => {
    const articles: Articles[] = [];
    const querySnapshot = await getDocs(collection(db, "articles"));
    querySnapshot.forEach((doc) => {
      articles.push(doc.data() as Articles);
    });
    return articles;
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const fetchedArticles = await getArticles();
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Failed to load articles:", error);
    }
  };

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
      <View style={styles.wrapper}>
        <View style={[styles.topContainer, { height: deviceHeight * 0.08 }]}>
          <WisdomBar wisdomScore={0.75} />
          <Streaks dayCount={5} />
        </View>

        <View style={[styles.deckContainer, { height: deviceHeight * 0.64 }]}>
          <SwipableDeck articles={articles} />
        </View>

        <View style={[styles.bottomContainer, { height: deviceHeight * 0.2 }]}>
          <Button title="Add Article" onPress={getArticles} />
          <IconButton
            icon="logout"
            size={24}
            color={Colors.purple2}
            onPress={authCtx.logout}
          />
          <Text style={styles.logoutText}>Logout</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoutText: {
    color: Colors.purple2,
    fontSize: 16,
    // make bold
    fontWeight: "bold",
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.black1,
  },
  wrapper: {
    flex: 1,
  },
  topContainer: {
    flexDirection: "row",
    backgroundColor: Colors.black1,
    alignItems: "center",
    marginLeft: 10,
    justifyContent: "center",
    padding: 10,
    zIndex: 1, // Ensure it is below the deck
  },
  deckContainer: {
    zIndex: 1, // Ensure the deck is above both containers
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    backgroundColor: "transparent",
    zIndex: 1, // Ensure it is below the deck
  },
});
