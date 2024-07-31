import * as FileSystem from "expo-file-system";

const OPENAI_API_KEY =
  "sk-proj-9SxNUvMwOzxA0FSAeDAhT3BlbkFJ03bWeKeUqcSj4IuouFvn";

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
            content: `Summarize the following article with three bullet points of one short sentence each using the following template :
                {
                  "title": "Article Title x",
                  "summary1": "Summary sentence 1 for article x",
                  "summary2": "Summary sentence 2 for article x",
                  "summary3": "Summary sentence 3 for article x",
                  "length": "y minutes"
                },
              
              Here is the text : ${inputText}`,
          },
        ],
        temperature: 0.7,
      }),
    });

    const jsonResponse = await response.json();

    if (jsonResponse.choices && jsonResponse.choices.length > 0) {
      // Get the path for the JSON file
      const fileUri = FileSystem.documentDirectory + "openairesponse.json";
      // Write the file
      await FileSystem.writeAsStringAsync(
        fileUri,
        jsonResponse.choices[0].message.content,
        { encoding: FileSystem.EncodingType.UTF8 }
      );
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
