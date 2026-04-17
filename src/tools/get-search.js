import { tool, zodSchema } from "ai";
import { getExa } from "../utils/ai.js";
import { z } from "zod";

export const searchTool = tool({
  description: "Search for information on the internet and return relevant results.",
  inputSchema: zodSchema(
    z.object({
      query: z.string().describe("The search query to execute."),
    }),
  ),
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
