import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, StyleSheet, Dimensions, View, ScrollView } from "react-native";
import { Colors } from "@/constants/Colors";
import { AuthContext } from "@/store/auth-context";
import WisdomBar from "@/components/memoMVP/Gamification/wisdomBar";
import TopLine from "@/components/memoMVP/Gamification/TopLine";
import Carousel from "@/components/memoMVP/Carousel/carousel";
import IconButtonAnt from "@/components/memoMVP/UI/IconButtonAnt";
import ReadMore from "@/components/memoMVP/ReadMore/ReadMore";
import AddURL from "@/components/memoMVP/AddURL";

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

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const articlesJson = require("../assets/articles.json");
        const articlesArray = Array.isArray(articlesJson) ? articlesJson : articlesJson.articles;
        const parsedArticles: Articles[] = articlesArray.map((article: any) => ({
          title: article.title,
          content: Array.isArray(article.content) ? article.content.join(" ") : article.content,
        }));
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
          <WisdomBar wisdomScore={0.60} />
    
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
            <IconButtonAnt icon="pluscircle" size={100} color={Colors.purple1} onPress={toggleModal} />
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
    backgroundColor: Colors.error1,
  },
  wrapper: {
    flex: 1,
    backgroundColor: Colors.grey1,
  },
  header: {
    flexDirection: "column",
    backgroundColor: Colors.error2,
    alignItems: "center",
    marginHorizontal: 5,
    justifyContent: "center",
    padding: 10,
    height: deviceHeight * 0.15,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  deckContainer: {
    height: deviceHeight * 0.60,
  },
  fixedButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
});
