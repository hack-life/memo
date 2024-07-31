import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Swiper from "react-native-deck-swiper";
import Card from "./card";
import { Colors } from "@/constants/Colors";
import llm from "@/components/memoMVP/carousel/llm"; // Your summarization function
import * as FileSystem from "expo-file-system";

interface Articles {
  title: string;
  content: string;
}

interface Summary {
  title: string;
  summary1: string;
  summary2: string;
  summary3: string;
  length?: string;
  
}

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

const Carousel = ({ articles }: { articles: Articles[] }) => {
  const [summaries, setSummaries] = useState<Summary[]>([]);



  useEffect(() => {
    const getSummaries = async () => {
      if (articles.length === 0) {
        console.log("No articles to summarize.");
        return;
      }
      try {
        const summaries = await Promise.all(
          articles.map(async (article) => {
            await llm(article.content);
            const fileUri =
              FileSystem.documentDirectory + "openairesponse.json";
            const fileContent = await FileSystem.readAsStringAsync(fileUri);

            const summary = JSON.parse(fileContent);
            return {
              title: article.title,
              summary1: summary.summary1,
              summary2: summary.summary2,
              summary3: summary.summary3,
              length: summary.length,
            };
          })
        );
        console.log("Summaries:", summaries);
        setSummaries(summaries);
      } catch (error) {
        console.error("Error generating summaries:", error);
      }
    };

    getSummaries();
  }, [articles]);

  const renderCard = (card: Summary) => {
    return (
      <Card
        title={card.title}
        summary1={card.summary1}
        summary2={card.summary2}
        summary3={card.summary3}
        length={card.length}
      />
    );
  };

  return (
    <View style={styles.container}>
      {summaries.length === 0 ? 
      
      (
        <View style={styles.placeHolderCard}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) 
      : 
      (
        <Swiper
          cards={summaries}
          backgroundColor={Colors.black1}
          renderCard={renderCard}
          stackSize={3}
          cardVerticalMargin={10}
          verticalSwipe={false}
          
     
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingText: {
    fontSize: 20,
    color: Colors.error1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible"
  },
  placeHolderCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
 
});

export default Carousel;
