
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import Carousel from './carousel';
import carouselData from './carouselData.json'; // Ensure this path is correct
import { Colors } from '@/constants/Colors';

const SwipableDeck = () => {

  const renderCard = (card) => {
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
        backgroundColor = {Colors.black1}
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
