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
import { collection, getDocs, addDoc } from "firebase/firestore";

interface Articles {
  title: string;
  content: string;
}

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

export default function HomeScreen() {
  const authCtx = useContext(AuthContext);
  const [articles, setArticles] = useState<Articles[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const addArticle = async (article: Articles) => {
    try {
      const docRef = await addDoc(collection(db, "articles"), {
        Title: article.title,
        Content: article.content,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  }

  const getArticles = async () => {
    const articles: Articles[] = [];
    try {
      const querySnapshot = await getDocs(collection(db, "articles"));
      console.log("Query response from firebase:", querySnapshot);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(doc.id, " => ", data);
        if (
          typeof data.Title === "string" &&
          typeof data.Content === "string"
        ) {
          articles.push({
            title: data.Title,
            content: data.Content,
          });
          console.log(`Document ${doc.id} has been added to the articles`);
        } else {
          console.warn(`Document ${doc.id} has invalid data format`);
          console.warn(`  title ${typeof data.Title} (${data.Titel})`);
          console.warn(`  content ${typeof data.Content} (${data.Content})`);
        }
      });
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
    return articles;
  };

  // useEffect(() => {
  //   loadArticles();
  // }, []);

  // const loadArticles = async () => {
  //   try {
  //     const fetchedArticles = await getArticles();
  //     setArticles(fetchedArticles);
  //   } catch (error) {
  //     console.error("Failed to load articles:", error);
  //   }
  // };

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const articlesJson = require("../assets/articles.json");
        const articlesArray = Array.isArray(articlesJson)
          ? articlesJson
          : articlesJson.articles;
        const parsedArticles: Articles[] = articlesArray.map(
          (article: any) => ({
            title: article.title,
            content: Array.isArray(article.content)
              ? article.content.join(" ")
              : article.content,
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
            <ReadMore articles={articlesAllJson} />
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
