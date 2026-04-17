import { tool, zodSchema } from "ai";
import { getExa } from "../utils/ai.js";
import { z } from "zod";


const MAX_CHARACTERS = 980;
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
     numResults: 3,
      contents: {
        highlights: {
          maxCharacters: MAX_CHARACTERS,
        },
    
      },
    });

    return {
      results: (result.results)
    };
  },
});
