import { createGroq } from "@ai-sdk/groq";
import Exa from "exa-js";

export const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

let exaClient;

export function getExa() {
  if (!process.env.EXA_API_KEY) {
    throw new Error("EXA_API_KEY is missing. Set it in your environment.");
  }

  if (!exaClient) {
    exaClient = new Exa(process.env.EXA_API_KEY);
  }

  return exaClient;
}
