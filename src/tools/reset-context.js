import { tool , zodSchema } from "ai";
import { z } from "zod";
import { clearUserContext } from "../utils/chat-context";
export const resetContextTool = tool({
  description: "Reset the conversation context. Use this if the AI is stuck or not responding appropriately.",
  inputSchema: zodSchema(
    z.object({
        reason: z.string().describe("Optional reason for resetting the context."),
    }),
  ),
  execute: async ({ reason }) => {
    clearUserContext();
    return { success: true };
  },
});