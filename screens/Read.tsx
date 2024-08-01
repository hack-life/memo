import { SafeAreaView, ScrollView, StyleSheet, Dimensions, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import ProgressBarIcon from '@/components/memoMVP/Read/ProgressBarIcon';
import Article from '@/components/memoMVP/Read/Article';

const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const updateProgressData = async (date, articlesRead) => {
  try {
    const data = await AsyncStorage.getItem('progressData');
    const progressData = data ? JSON.parse(data) : {};

    if (!progressData[date]) {
      progressData[date] = { readArticles: 0 };
    }

    progressData[date].readArticles = articlesRead;

    await AsyncStorage.setItem('progressData', JSON.stringify(progressData));
  } catch (error) {
    console.error("Error updating progress data:", error);
  }
};

export default function ReadScreen() {
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const [scrollViewContentHeight, setScrollViewContentHeight] = useState(0);
  const [progress, setProgress] = useState(0);
  const [articlesRead, setArticlesRead] = useState(0);

  const navigation = useNavigation();
  
  const UpdateProgressBar = (value) => {
    const contentOffsetY = value.nativeEvent.contentOffset.y;
    const totalScrollHeight = scrollViewContentHeight - scrollViewHeight;
    if (totalScrollHeight > 0) {
      const progressValue = contentOffsetY / totalScrollHeight;
      setProgress(progressValue);

      if (progressValue >= 1 && articlesRead < 3) {
        setArticlesRead(prev => prev + 1);
        updateProgressData(getCurrentDate(), articlesRead + 1);
      }
    } else {
      setProgress(0);
    }
  };

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const data = await AsyncStorage.getItem('progressData');
        const progressData = data ? JSON.parse(data) : {};
        const today = getCurrentDate();
        if (progressData[today]) {
          setArticlesRead(progressData[today].readArticles || 0);
        }
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };

    fetchProgressData();
  }, []);

  const deviceHeight = Dimensions.get('screen').height;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        onScroll={UpdateProgressBar}
        onContentSizeChange={(contentWidth, contentHeight) =>
          setScrollViewContentHeight(contentHeight)
        }
        onLayout={(event) =>
          setScrollViewHeight(event.nativeEvent.layout.height)
        }
        scrollEventThrottle={12}
        style={[styles.ReadingContainer, { height: deviceHeight * 0.85 }]}
      >
        <Article />
      </ScrollView>

      <ProgressBarIcon progress={progress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black1,
  },
  ReadingContainer: {
    backgroundColor: Colors.black1
  }
});
