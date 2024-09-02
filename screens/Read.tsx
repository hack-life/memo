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
import { useState, useEffect, useRef, useCallback } from "react";
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
  const prompt = `Generate a multiple-choice question based on the following content:

${content}

Please format your response exactly as follows:
QUESTION: [The question text here]
A: [Option A text]
B: [Option B text]
C: [Option C text]
D: [Option D text]
CORRECT: [The letter of the correct answer (A, B, C, or D)]

Ensure that the correct answer is randomly chosen among A, B, C, or D.`;

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
            content:
              "You are a helpful assistant that generates MCQs in a specific format.",
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
    console.log("Response : ", jsonResponse.choices[0]);
    const mcqContent = jsonResponse.choices[0].message.content.trim();
    
    // Parse the question, options, and correct answer
    const lines = mcqContent.split('\n');
    const question = lines[0].replace('QUESTION: ', '');
    const options = lines.slice(1, 5).map(line => line.slice(3));
    const correctAnswerLetter = lines[5].replace('CORRECT: ', '');
    const correctAnswerIndex = correctAnswerLetter.charCodeAt(0) - 65; // Convert A, B, C, D to 0, 1, 2, 3

    return { question, options, correctAnswerIndex };
  } catch (error) {
    console.error("Error fetching MCQ:", error);
    return null;
  }
};

interface MCQ {
  question: string;
  options: string[];
  correctAnswerIndex: number;
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
  const [randomizedOptions, setRandomizedOptions] = useState<string[]>([]);
  const correctAnswerRef = useRef<string | null>(null);

  const shuffleArray = useCallback((array: string[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  const handleAnswerSelect = (option: string) => {
    if (option === correctAnswerRef.current) {
      Alert.alert("Correct!", "Great job! You've selected the right answer.");
    } else {
      Alert.alert("Incorrect", `The correct answer is: ${correctAnswerRef.current}`);
    }
  };

  const route = useRoute<RouteProp<{ params: ReadScreenParams }, "params">>();
  const { title, content } = route.params || {};

  const UpdateProgressBar = (
    value: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
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
        if (generatedMCQ) {
          setMcq(generatedMCQ);
          correctAnswerRef.current =
            generatedMCQ.options[generatedMCQ.correctAnswerIndex];
          setRandomizedOptions(shuffleArray(generatedMCQ.options));
        }
      }
    };

    generateMCQ();
  }, [content, shuffleArray]);

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
            {randomizedOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.mcqOption}
                onPress={() => handleAnswerSelect(option)}
              >
                <Text style={styles.mcqOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
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
    color: Colors.purple1,
    marginBottom: 20,
    textAlign: "center",
  },
  mcqOption: {
    backgroundColor: Colors.grey1,
    padding: 15,
    borderRadius: 25, // Increased border radius for rounded buttons
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1, // Add border
    borderColor: Colors.purple1, // Border color
  },
  mcqOptionText: {
    color: Colors.white1,
    textAlign: "center",
    fontSize: 16, // Increased font size for better readability
  },
  selectedOption: {
    backgroundColor: Colors.purple1,
  },
  answerButton: {
    backgroundColor: Colors.white1,
    padding: 15,
    borderRadius: 25,
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
