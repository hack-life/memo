/* eslint-disable */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { JSDOM } from "jsdom";

const fetch = (global as any).fetch || require("node-fetch");

admin.initializeApp();

interface ArticleContent {
  title: string;
  content: string;
  url: string;
  createdAt: admin.firestore.Timestamp;
}

exports.extractArticleContent = functions.https.onRequest(
  async (
    req: functions.https.Request,
    res: functions.Response
  ): Promise<void> => {
    try {
      if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
      }

      const { url } = req.body;

      if (!url) {
        res.status(400).json({ error: "No URL provided" });
        return;
      }

      const response = await fetch(url);
      const html = await response.text();

      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const title = doc.querySelector("title")?.textContent || "No title found";

      const articleContentFetched =
        doc.querySelector("article") || doc.querySelector("main") || doc.body;
      if (articleContentFetched) {
        const scriptsAndStyles =
          articleContentFetched.querySelectorAll("script, style");
        scriptsAndStyles.forEach((el: Element) => el.remove());

        const comments = articleContentFetched.childNodes;
        for (let i = comments.length - 1; i >= 0; i--) {
          if (comments[i].nodeType === 8) {
            // Node.COMMENT_NODE
            comments[i].remove();
          }
        }
      }

      const articleContent: ArticleContent = {
        title: title.trim() || "No title found",
        content: articleContentFetched.textContent?.trim() || "",
        url: url,
        createdAt: admin.firestore.Timestamp.now(),
      };

      // // Save to Firestore (need to test this)
      // console.log("Saving article content:", articleContent);
      // const db = admin.firestore();
      // const articlesRef = db.collection("articles");
      // const docRef = await articlesRef.add(articleContent);

      // res.status(200).json({
      //   message: "Article extracted and saved successfully",
      //   articleId: docRef.id,
      //   ...articleContent,
      // });

      res.status(200).json(articleContent);
    } catch (error) {
      console.error("Error extracting or saving article content:", error);
      res
        .status(500)
        .json({ error: "Failed to extract or save article content" });
    }
  }
);
