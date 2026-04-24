import { tool, zodSchema } from "ai";
import { getExa } from "../utils/ai.js";
import { z } from "zod";

const MAX_CHARACTERS = 1500;
export const searchTool = tool({
  description:
    "Search for factual, historical, technical, or general information on the internet. Use this for documentation, explanations, how-tos, and non-time-sensitive queries. For latest news or current events, use searchNews instead.",
  inputSchema: zodSchema(
    z.object({
      query: z.string().describe("The search query to execute."),
    }),
  ),
  execute: async ({ query }) => {
    const exa = getExa();

    const result = await exa.search(query, {
      type: "neural",
      numResults: 5,
      contents: {
        highlights: {
          maxCharacters: MAX_CHARACTERS,
        },
      },
    });

    return {
      results: result.results,
    };
  },
});