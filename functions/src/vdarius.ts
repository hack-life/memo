/* eslint-disable */
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { JSDOM } from "jsdom";

const fetch = (global as any).fetch || require("node-fetch");

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

interface ArticleContent {
  title: string;
  content: string;
  url: string;
  createdAt: admin.firestore.Timestamp;
}

const extractContent = (document: Document): string => {
  const articleContent =
    document.querySelector("article") ||
    document.querySelector("main") ||
    document.body;
  if (!articleContent) return "";

  const clonedContent = articleContent.cloneNode(true) as HTMLElement;
  clonedContent.querySelectorAll("script, style").forEach((el) => el.remove());

  // Use the NodeFilter from the JSDOM window object
  const walker = document.createTreeWalker(
    clonedContent,
    // @ts-ignore
    document.defaultView.NodeFilter.SHOW_COMMENT
  );

  let node;
  while ((node = walker.nextNode())) {
    node.parentNode?.removeChild(node);
  }

  return clonedContent.textContent?.trim() || "";
};

export const extractArticleContent = functions.https.onRequest(
  async (
    req: functions.https.Request,
    res: functions.Response
  ): Promise<void> => {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const { url } = req.body;
    if (!url) {
      res.status(400).json({ error: "No URL provided" });
      return;
    }

    try {
      const response = await fetch(url);
      const html = await response.text();
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const articleContent: ArticleContent = {
        title:
          doc.querySelector("title")?.textContent?.trim() || "No title found",
        content: extractContent(doc),
        url: url,
        createdAt: admin.firestore.Timestamp.now(),
      };

      // Save to Firestore (need to test this)
      console.log("Saving article content:", articleContent);
      const db = admin.firestore();
      const articlesRef = db.collection("articles");
      const docRef = await articlesRef.add(articleContent);

      res.status(200).json({
        message: "Article extracted and saved successfully",
        articleId: docRef.id,
        ...articleContent,
      });
    } catch (error) {
      console.error("Error extracting or saving article content:", error);
      res
        .status(500)
        .json({ error: "Failed to extract or save article content" });
    }
  }
);
