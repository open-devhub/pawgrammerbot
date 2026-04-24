import { tool, zodSchema } from "ai";
import { z } from "zod";
import TurndownService from "turndown";

const MAX_CHARS = 3000;
const FETCH_TIMEOUT_MS = 8000;

const turndown = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
});

export const fetchPageTool = tool({
  description:
    "Fetch and read the full content of a specific URL. Use this when the user provides a link, or when search results return a URL worth reading in full. Returns the page as readable text.",
  inputSchema: zodSchema(
    z.object({
      url: z.string().url().describe("The full URL to fetch and read."),
    }),
  ),
  execute: async ({ url }) => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; PawgrammerBot/1.0; +https://github.com/AdityaKodez/pawgrammerbot)",
        },
      });

      clearTimeout(timeout);

      if (!response.ok) {
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("text/html") && !contentType.includes("text/plain")) {
        return {
          success: false,
          error: `Unsupported content type: ${contentType}`,
        };
      }

      const html = await response.text();
      const markdown = turndown.turndown(html);
      const trimmed = markdown.replace(/\n{3,}/g, "\n\n").trim().slice(0, MAX_CHARS);

      return {
        success: true,
        url,
        content: trimmed,
        truncated: markdown.length > MAX_CHARS,
      };
    } catch (err) {
      return {
        success: false,
        error: err.name === "AbortError" ? "Request timed out." : (err.message || "Fetch failed."),
      };
    }
  },
});