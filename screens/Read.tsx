import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
  Text,
  View,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";
import ProgressBarIcon from "@/components/memoMVP/Read/ProgressBarIcon";
import { useFonts } from "expo-font";
import axios from "axios";
import { RouteProp } from "@react-navigation/native";

// Define the type for route parameters
interface ReadScreenParams {
  title: string;
  content: string;
}

const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const updateProgressData = async (date: string, articlesRead: number) => {
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

const fetchMCQ = async (content: string) => {
  const apiKey = "sk-proj-9SxNUvMwOzxA0FSAeDAhT3BlbkFJ03bWeKeUqcSj4IuouFvn";
  const prompt = `Generate a multiple-choice question based on the following content:\n\n${content}\n\nThe question should have 4 options with one correct answer.`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that generates MCQs.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    const jsonResponse = await response.json();
    console.log(jsonResponse);
    const mcqContent = jsonResponse.choices[0].message.content.trim();
    
    // Assuming the response is a string with the question and options separated by newlines
    const [question, ...options] = mcqContent.split('\n').filter((line: string) => line.trim() !== '');
    return { question, options };
  } catch (error) {
    console.error("Error fetching MCQ:", error);
    return null;
  }
};

interface MCQ {
  question: string;
  options: string[];
}

export default function ReadScreen() {
  const [fontsLoaded] = useFonts({
    "Serif-Italic": require("@/assets/fonts/DMSerifText-Italic.ttf"),
    Serif: require("@/assets/fonts/DMSerifText-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null; // or some loading indicator
  }
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const [scrollViewContentHeight, setScrollViewContentHeight] = useState(0);
  const [progress, setProgress] = useState(0);
  const [articlesRead, setArticlesRead] = useState(0);
  const [mcq, setMcq] = useState<MCQ | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

  const handleAnswerSelect = (option: string) => {
    setSelectedAnswer(option);
    // Assuming the correct answer is the first option for simplicity
    setCorrectAnswer(mcq?.options[0] || null);
  };

  const route = useRoute<RouteProp<{ params: ReadScreenParams }, 'params'>>();
  const { title, content } = route.params || {};

  const UpdateProgressBar = (value: NativeSyntheticEvent<NativeScrollEvent>) => {
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

  useEffect(() => {
    const generateMCQ = async () => {
      if (content) {
        const generatedMCQ = await fetchMCQ(content);
        setMcq(generatedMCQ);
      }
    };

    generateMCQ();
  }, [content]);

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
        {mcq && (
          <View style={styles.mcqContainer}>
            <Text style={styles.mcqQuestion}>{mcq.question}</Text>
            {mcq.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.mcqOption,
                  selectedAnswer === option && styles.selectedOption,
                ]}
                onPress={() => handleAnswerSelect(option)}
              >
                <Text style={styles.mcqOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.answerButton}>
              <Text style={styles.answerButtonText}>Answer</Text>
            </TouchableOpacity>
          </View>
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
    fontFamily: "Serif",
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.white1,
    padding: 20,
    textAlign: "justify",
    fontFamily: "Serif",
  },
  mcqContainer: {
    padding: 20,
    backgroundColor: Colors.black2,
    borderRadius: 10,
    marginTop: 20,
  },
  mcqQuestion: {
    fontSize: 18,
    color: Colors.purple,
    marginBottom: 20,
    textAlign: "center",
  },
  mcqOption: {
    backgroundColor: Colors.gray1,
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  mcqOptionText: {
    color: Colors.white1,
    textAlign: "center",
  },
  selectedOption: {
    backgroundColor: Colors.purple,
  },
  answerButton: {
    backgroundColor: Colors.white1,
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  answerButtonText: {
    color: Colors.black1,
    fontWeight: "bold",
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
