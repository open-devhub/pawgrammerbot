import { tool, zodSchema } from "ai";
import { z } from "zod";
import { evaluate, format } from "mathjs";

export const calculateTool = tool({
  description:
    "Evaluate mathematical expressions, equations, unit conversions, algebra, statistics, and numeric calculations. Use this for any math question instead of computing in your head.",
  inputSchema: zodSchema(
    z.object({
      expression: z
        .string()
        .describe(
          "The math expression to evaluate. Examples: '2^10', 'sqrt(144)', '5 km to miles', 'sin(pi/2)', '(3+4i) * (1-2i)'",
        ),
    }),
  ),
  execute: async ({ expression }) => {
    try {
      const result = evaluate(expression);
      const formatted =
        typeof result === "object"
          ? format(result, { precision: 10 })
          : String(result);
      return { success: true, expression, result: formatted };
    } catch (err) {
      return {
        success: false,
        expression,
        error: err.message || "Could not evaluate expression.",
      };
    }
  },
});