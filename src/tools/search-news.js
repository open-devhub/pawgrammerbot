import { tool, zodSchema } from "ai";
import { getExa } from "../utils/ai.js";
import { z } from "zod";

const MAX_CHARACTERS = 1500;

export const searchNewsTool = tool({
  description:
    "Search for recent or live news and current events. Use this when the user asks about anything recent, latest, trending, breaking, or time-sensitive. Do NOT use for historical or factual questions.",
  inputSchema: zodSchema(
    z.object({
      query: z.string().describe("The news search query."),
    }),
  ),
  execute: async ({ query }) => {
    const exa = getExa();
    const sevenDaysAgo = new Date(
      Date.now() - 7 * 24 * 60 * 60 * 1000,
    ).toISOString();

    const result = await exa.search(query, {
      type: "neural",
      numResults: 5,
      startPublishedDate: sevenDaysAgo,
      contents: {
        highlights: {
          maxCharacters: MAX_CHARACTERS,
        },
      },
    });

    return { results: result.results };
  },
});