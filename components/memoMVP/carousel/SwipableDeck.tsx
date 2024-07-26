import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Swiper from "react-native-deck-swiper";
import Carousel from "./carousel";
import { Colors } from "@/constants/Colors";
import carouselData from "@/components/memoMVP/carousel/carouselData.json";
import llm from "@/components/memoMVP/carousel/llm"; // Assuming this is your summarization function
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

const SwipableDeck = ({ articles }: { articles: Articles[] }) => {
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
            // fetch the summary from the file
            const fileUri =
              "/Users/darius/Code/react-native/memo/components/memoMVP/carousel/openairesponse.json";
            const response = await FileSystem.readAsStringAsync(fileUri, {
              encoding: FileSystem.EncodingType.UTF8,
            });
            const summary = JSON.parse(response);
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
    if (!card) {
      // Optionally render a placeholder 
      return (
        <View style={styles.placeHolderCard}>
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
      <Carousel
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
      <Swiper
        cards={summaries}
        backgroundColor={Colors.black1}
        renderCard={renderCard}
        stackSize={3}
        cardVerticalMargin={130}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  placeHolderCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SwipableDeck;
