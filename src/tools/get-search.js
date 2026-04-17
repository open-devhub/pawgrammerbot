import { tool } from "ai";
import { getExa } from "../utils/ai.js";

export const searchTool = tool({
  description: "Search for information on the internet and return relevant results.",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "The search query to execute.",
      },
    },
    required: ["query"],
    additionalProperties: false,
  },
  execute: async ({ query }) => {
    const exa = getExa();

    const result = await exa.search(query, {
      type: "fast",
      contents: {
        highlights: {
          maxCharacters: 4000,
        },
      },
    });

    return {
      results: (result.results || []).slice(0, 5).map((item) => ({
        title: item.title,
        url: item.url,
        highlights: item.highlights || [],
      })),
    };
  },
});
