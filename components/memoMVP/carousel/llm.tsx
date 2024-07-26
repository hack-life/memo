import RNFS from "react-native-fs";

const OPENAI_API_KEY =
  "sk-proj-Y7g7DTlYRA2A9Sp34AkaT3BlbkFJR8Kqz3lJFM4urCpwGS7C";

async function generateAndSaveSummary(inputText: string) {
  try {
    console.log("Generating summary for input text:", inputText);
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
            content: `Summarize the following text with three bullet points of one short sentence each using the following template :
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
    console.log("Response:", jsonResponse);

    if (jsonResponse.choices && jsonResponse.choices.length > 0) {
      const content = jsonResponse.choices[0].message.content;

      // Parse the content as JSON
      const parsedContent = JSON.parse(content);

      // Convert parsed content back to a formatted JSON string
      const jsonString = JSON.stringify(parsedContent, null, 2);

      // Get the path for the JSON file
      const path = RNFS.DocumentDirectoryPath + "/carouselData.json";

      // Write the file
      await RNFS.writeFile(path, jsonString, "utf8");
      console.log("File written successfully to:", path);
      return path; // Return the path where the file was saved
    } else {
      throw new Error("No summary generated.");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

export default generateAndSaveSummary;
