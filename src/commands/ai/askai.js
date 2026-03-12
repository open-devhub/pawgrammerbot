import "dotenv/config";
import { Groq } from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const model = "llama-3.3-70b-versatile";

export default {
  name: "askai",
  description: `Ask ${model} Ai Model`,
  aliases: ["ai"],
  callback: async (client, message, args) => {
    try {
      if (message.author.bot) return;
      await message.channel.sendTyping();

      const question = args.join(" ");

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Answer the following question **only if it is a safe, appropriate question**.\n${question}`,
          },
        ],
        model,
        temperature: 0.8,
        max_completion_tokens: 640,
        top_p: 1,
        stream: true,
        stop: null,
      });

      let answer = "";
      for await (const chunk of chatCompletion) {
        answer += chunk.choices[0]?.delta?.content || "";
      }

      const paragraphs = answer.split("\n\n");
      const messageParts = [];
      let currentPart = "";

      for (const para of paragraphs) {
        const paraWithSep = currentPart ? "\n\n" + para : para;
        if (currentPart.length + paraWithSep.length > 2000) {
          if (currentPart) {
            messageParts.push(currentPart.trim());
            currentPart = para;
          } else {
            const chunks = splitToChunks(para, 2000);
            messageParts.push(...chunks);
          }
        } else {
          currentPart += paraWithSep;
        }
      }
      if (currentPart) {
        messageParts.push(currentPart.trim());
      }

      for (const part of messageParts) {
        await message.channel.send(part);
      }
    } catch (err) {
      console.log(err);
    }
  },
};

function splitToChunks(text, maxLen) {
  const chunks = [];
  let remaining = text;
  while (remaining.length > maxLen) {
    let cutAt = maxLen;
    while (cutAt > 0 && remaining[cutAt - 1] !== " ") {
      cutAt--;
    }
    if (cutAt === 0) cutAt = maxLen;
    chunks.push(remaining.slice(0, cutAt).trim());
    remaining = remaining.slice(cutAt).trim();
  }
  if (remaining) chunks.push(remaining);
  return chunks;
}
