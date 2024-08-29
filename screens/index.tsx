import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Text,
  Button,
  ScrollView,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Colors } from "@/constants/Colors";
import IconButton from "@/components/memoMVP/UI/IconButton";
import { AuthContext } from "@/store/auth-context";
import WisdomBar from "@/components/memoMVP/Gamification/wisdomBar";
import TopLine from "@/components/memoMVP/Gamification/TopLine";
import Carousel from "@/components/memoMVP/carousel/carousel";
import IconButtonAnt from "@/components/memoMVP/UI/IconButtonAnt";
import ReadMore from "@/components/memoMVP/ReadMore/ReadMore";
import AddURL from "@/components/memoMVP/AddURL";
import { db } from "../firebaseConfig";
import {
  collection,
  onSnapshot,
  getDocs,
  getDoc,
  doc,
  addDoc,
} from "firebase/firestore";

interface Articles {
  title: string;
  content: string;
}

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

export default function HomeScreen() {
  const authCtx = useContext(AuthContext);
  const [articles, setArticles] = useState<Articles[]>([]);
  const [allArticles, setAllArticles] = useState<Articles[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);

  // Fetch all articles from the database
  useEffect(() => {
    const UID = "W1V7h70asObNSak0Pr1MJjjopgP2";
    const userRef = doc(db, "users", UID);

    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        let allArticles = docSnap.data()?.articles ?? [];
        console.log("Real-time Articles:", allArticles);

        // parse all articles
        const parsedArticles = allArticles.map(
          (article: any, index: number) => ({
            title: article.title,
            url: article.url,
            key: index.toString(), // Fallback to using the index as the key
          })
        );

        setAllArticles(parsedArticles);
      } else {
        console.log("No such document!");
      }
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  // Fetch 3 random articles from the database to display in the carousel
  useEffect(() => {
    const UID = "W1V7h70asObNSak0Pr1MJjjopgP2";
    const userRef = doc(db, "users", UID);

    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        let articles = docSnap.data()?.articles ?? [];

        // Shuffle the array to get a random order
        articles = articles.sort(() => Math.random() - 0.5);

        // Get the first 3 articles after shuffling
        const selectedArticles = articles.slice(0, 3);

        const parsedArticles = selectedArticles.map((article: any) => ({
          title: article.title,
          content: Array.isArray(article.content)
            ? article.content.join(" ")
            : article.content,
        }));
        setArticles(parsedArticles);
      } else {
        console.log("No such document!");
      }
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []); // Dependency array is empty, meaning this effect runs once on component mount

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <TopLine />
          <WisdomBar wisdomScore={0.6} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.deckContainer}>
            <Carousel articles={articles} />
          </View>
          <View>
            <ReadMore articles={allArticles} />
          </View>
        </ScrollView>

        {!isModalVisible && (
          <View style={styles.fixedButton}>
            <IconButtonAnt
              icon="pluscircle"
              size={80}
              color={Colors.purple1}
              onPress={toggleModal}
            />
          </View>
        )}

        <AddURL isModalVisible={isModalVisible} toggleModal={toggleModal} />
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
    backgroundColor: Colors.black1,
  },
  header: {
    flexDirection: "column",
    backgroundColor: Colors.black1,
    alignItems: "center",
    justifyContent: "flex-start",

    padding: 5,
    height: deviceHeight * 0.15,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  deckContainer: {
    height: deviceHeight * 0.6,
  },
  fixedButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    zIndex: 1,
  },
});
