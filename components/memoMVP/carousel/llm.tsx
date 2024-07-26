import RNFS from "react-native-fs";
import * as FileSystem from "expo-file-system";

const OPENAI_API_KEY =
  "sk-proj-Y7g7DTlYRA2A9Sp34AkaT3BlbkFJR8Kqz3lJFM4urCpwGS7C";

const generateAndSaveSummary = async (inputText: string) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that summarizes text.",
          },
          {
            role: "user",
            content: `Summarize the following articles with three bullet points of one short sentence each using the following template :
              [
                {
                  "title": "Article Title 1",
                  "summary1": "Summary sentence 1 for article 1",
                  "summary2": "Summary sentence 2 for article 1",
                  "summary3": "Summary sentence 3 for article 1",
                  "source": "Source 1",
                  "length": "10min"
                },
                {
                  "title": "Article Title 2",
                  "summary1": "Summary sentence 1 for article 2",
                  "summary2": "Summary sentence 2 for article 2",
                  "summary3": "Summary sentence 3 for article 2",
                  "source": "Source 2",
                  "length": "15min"
                },
                {
                  "title": "Article Title 3",
                  "summary1": "Summary sentence 1 for article 3",
                  "summary2": "Summary sentence 2 for article 3",
                  "summary3": "Summary sentence 3 for article 3",
                  "source": "Source 3",
                  "length": "5min"
                }
              ]
              : ${inputText}`,
          },
        ],
        temperature: 0.7,
      }),
    });

    const jsonResponse = await response.json();
    console.log("Summary response:", jsonResponse);

    if (jsonResponse.choices && jsonResponse.choices.length > 0) {
      // Get the path for the JSON file
      const fileUri = FileSystem.documentDirectory + "carouselData.json";

      // Write the file
      await FileSystem.writeAsStringAsync(
        fileUri,
        JSON.stringify(jsonResponse),
        { encoding: FileSystem.EncodingType.UTF8 }
      );
      console.log("Summary saved to:", fileUri);
      return fileUri;
    } else {
      throw new Error("No summary generated.");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export default generateAndSaveSummary;
