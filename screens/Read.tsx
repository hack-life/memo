import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
  Text,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";
import ProgressBarIcon from "@/components/memoMVP/Read/ProgressBarIcon";

const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const updateProgressData = async (date, articlesRead) => {
  try {
    const data = await AsyncStorage.getItem("progressData");
    const progressData = data ? JSON.parse(data) : {};

    if (!progressData[date]) {
      progressData[date] = { readArticles: 0 };
    }

    progressData[date].readArticles = articlesRead;

    await AsyncStorage.setItem("progressData", JSON.stringify(progressData));
  } catch (error) {
    console.error("Error updating progress data:", error);
  }
};

export default function ReadScreen() {
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const [scrollViewContentHeight, setScrollViewContentHeight] = useState(0);
  const [progress, setProgress] = useState(0);
  const [articlesRead, setArticlesRead] = useState(0);

  const route = useRoute();
  const { title, content } = route.params || {};

  const UpdateProgressBar = (value) => {
    const contentOffsetY = value.nativeEvent.contentOffset.y;
    const totalScrollHeight = scrollViewContentHeight - scrollViewHeight;
    if (totalScrollHeight > 0) {
      const progressValue = contentOffsetY / totalScrollHeight;
      setProgress(progressValue);

      if (progressValue >= 1 && articlesRead < 3) {
        setArticlesRead((prev) => prev + 1);
        updateProgressData(getCurrentDate(), articlesRead + 1);
      }
    } else {
      setProgress(0);
    }
  };

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const data = await AsyncStorage.getItem("progressData");
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

  const deviceHeight = Dimensions.get("screen").height;
  const deviceWidth = Dimensions.get("screen").width;

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
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        {content ? (
          <Text style={styles.content}>{content}</Text>
        ) : (
          <Text style={styles.content}> No content available </Text>
        )}
      </ScrollView>

      <ProgressBarIcon progress={progress} Barwidth={deviceWidth * 0.75} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black1,
  },
  ReadingContainer: {
    backgroundColor: Colors.black1,
  },
  titleContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white1,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.white1,
    padding: 20,
    textAlign: "justify",
  },
  ArticleContainer: {
    flex: 1,
    backgroundColor: Colors.black1,
    margin: 10,
    marginTop: 40,
  },
  dateNauthor: {
    flex: 1,
    fontSize: 15,
    justifyContent: "flex-start",
    marginLeft: 50,
    color: Colors.white1,
  },
  Title: {
    fontSize: 40,
    color: Colors.white1,
  },
  Context: {
    fontSize: 25,
    fontStyle: "italic",
    color: Colors.white1,
  },
  Article: {
    fontSize: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    color: Colors.white1,
  },
});
