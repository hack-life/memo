import * as functions from "firebase-functions";
import { JSDOM } from "jsdom";

const fetch = require("node-fetch");

exports.extractArticleContent = functions.https.onRequest(
  async (req, res) => {
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
        scriptsAndStyles.forEach((el) => el.remove());

        const comments = articleContentFetched.childNodes;
        for (let i = comments.length - 1; i >= 0; i--) {
          if (comments[i].nodeType === 8) {
            // Node.COMMENT_NODE
            comments[i].remove();
          }
        }
      }

      const articleContent = {
        title: title.trim() || "No title found",
        content: articleContentFetched.textContent?.trim() || "",
        url: url,
        createdAt: new Date().toISOString()
      };

      res.status(200).json(articleContent);
    } catch (error: any) {
      console.error("Error extracting article content:", error);
      res.status(500).json({
        error: "Failed to extract article content",
        details: error.message,
        stack: error.stack
      });
    }
  }
);
