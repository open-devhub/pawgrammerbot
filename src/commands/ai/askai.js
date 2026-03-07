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
      await message.channel.send(answer);
    } catch (err) {
      console.log(err);
    }
  },
};
