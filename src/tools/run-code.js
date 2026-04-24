import { tool, zodSchema } from "ai";
import { z } from "zod";
import vm from "vm";

const TIMEOUT_MS = 3000;
const MAX_OUTPUT_LENGTH = 1500;

export const runCodeTool = tool({
  description:
    "Execute JavaScript code in a sandboxed environment. Use this to solve logic puzzles, process data, run algorithms, simulate scenarios, or verify code output. Only JavaScript is supported.",
  inputSchema: zodSchema(
    z.object({
      code: z
        .string()
        .describe(
          "Valid JavaScript code to execute. Use console.log() to produce output. No async, no imports, no require.",
        ),
    }),
  ),
  execute: async ({ code }) => {
    const logs = [];

    const sandbox = {
      console: {
        log: (...args) => logs.push(args.map(String).join(" ")),
        error: (...args) => logs.push("[error] " + args.map(String).join(" ")),
        warn: (...args) => logs.push("[warn] " + args.map(String).join(" ")),
      },
      Math,
      JSON,
      Array,
      Object,
      String,
      Number,
      Boolean,
      Date,
      parseInt,
      parseFloat,
      isNaN,
      isFinite,
    };

    try {
      vm.createContext(sandbox);
      vm.runInContext(code, sandbox, { timeout: TIMEOUT_MS });

      const output = logs.join("\n").slice(0, MAX_OUTPUT_LENGTH);
      return {
        success: true,
        output: output || "(no output)",
      };
    } catch (err) {
      return {
        success: false,
        error: err.message || "Execution failed.",
        output: logs.join("\n").slice(0, MAX_OUTPUT_LENGTH) || null,
      };
    }
  },
});