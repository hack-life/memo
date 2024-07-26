import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Swiper from "react-native-deck-swiper";
import Carousel from "./carousel";
import { Colors } from "@/constants/Colors";
import carouselData from "@/components/memoMVP/carousel/carouselData.json";
import llm from "@/components/memoMVP/carousel/llm"; // Assuming this is your summarization function

interface Articles {
  title: string;
  content: string;
}

interface Summary {
  title: string;
  summary1: string;
  summary2: string;
  summary3: string;
  image?: string;
  source?: string;
  length?: string;
}

const SwipableDeck = ({ articles }: { articles: Articles[] }) => {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  console.log("Articles:", articles.length);

  useEffect(() => {
    const getSummaries = async () => {
      if (articles.length === 0) {
        console.log("No articles to summarize.");
        return;
      }
      try {
        console.log("Content to summarize:", articles.map((article) => article.content));
        const summary1 = await llm(articles[0].content);
        // setSummaries(summaries);
        console.log("Summaries:", summaries);
      } catch (error) {
        console.error("Error generating summaries:", error);
      }
    };

    getSummaries();
  }, [articles]);


  const renderCard = (card: Summary) => {
    return (
      <Carousel
        title={card.title}
        summary1={card.summary1}
        summary2={card.summary2}
        summary3={card.summary3}
        image={card.image}
        source={card.source}
        length={card.length}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Swiper
        cards={carouselData}
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
});

export default SwipableDeck;
