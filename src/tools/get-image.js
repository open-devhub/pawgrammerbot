import { tool, zodSchema } from "ai";
import { z } from "zod";
import { getImageBytes } from "../utils/chat-context.js";

// Per-request factory: the AI SDK calls this tool's `execute` when the model
// wants to re-examine an earlier image in the session. The bytes live in the
// session's image registry; we return them via `toModelOutput` as image-data
// so the next model step actually sees the picture.
export function createGetImageTool(userId) {
  return tool({
    description:
      "Fetch a previously sent image from this session by its index, shown as `[image #N — ...]` in the conversation. Use this when the user refers to an earlier image or you need to re-examine one. The current turn's images are already attached — do not call this for them.",
    inputSchema: zodSchema(
      z.object({
        index: z
          .number()
          .int()
          .positive()
          .describe("The image number from the `[image #N — ...]` placeholder."),
      }),
    ),
    execute: async ({ index }) => {
      const entry = getImageBytes(userId, index);
      if (!entry) {
        return { found: false, index, error: `no image #${index} in this session` };
      }
      return {
        found: true,
        index,
        mime: entry.mime,
        base64: entry.bytes.toString("base64"),
      };
    },
    toModelOutput: ({ output }) => {
      if (!output || output.found === false) {
        return {
          type: "error-text",
          value:
            output && output.error
              ? String(output.error)
              : "image not found in this session",
        };
      }
      return {
        type: "content",
        value: [
          {
            type: "text",
            text: `Image #${output.index} (${output.mime}):`,
          },
          {
            type: "image-data",
            data: output.base64,
            mediaType: output.mime,
          },
        ],
      };
    },
  });
}
