import "dotenv/config";
import { Groq } from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const model = "openai/gpt-oss-120b";
const CONTEXT_TTL_MS = 15 * 60 * 1000;
const MAX_CONTEXT_MESSAGES = 5;
const USER_CONTEXT = new Map();

export default {
  name: "askai",
  description: `Ask ${model} Ai Model`,
  aliases: ["ai"],
  callback: async (client, message, args) => {
    try {
      if (message.author.bot) return;
      await message.channel.sendTyping();

      const question = args.join(" ");
      if (!question) {
        await message.reply("Please provide a question.");
        return;
      }

      const conversation = await buildConversation(message, question);

      const chatCompletion = await groq.chat.completions.create({
        messages: conversation,
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

      updateUserContext(message.author.id, question, answer);
    } catch (err) {
      console.log(err);
    }
  },
};

async function buildConversation(message, question) {
  const conversation = [];

  const existing = USER_CONTEXT.get(message.author.id);
  if (existing && existing.expiresAt > Date.now()) {
    conversation.push(...existing.messages);
  } else {
    USER_CONTEXT.delete(message.author.id);
  }

  const replyContext = await getReplyContext(message);
  if (replyContext) {
    conversation.push(replyContext);
  }

  conversation.push({
    role: "user",
    content: `Answer the following question **only if it is a safe, appropriate question**.\n${question}`,
  });
  return conversation;
}

async function getReplyContext(message) {
  if (!message.reference?.messageId) return null;

  try {
    const repliedMessage = await message.channel.messages.fetch(
      message.reference.messageId,
    );

    if (!repliedMessage.author?.bot || !repliedMessage.content) return null;

    return {
      role: "assistant",
      content: repliedMessage.content,
    };
  } catch {
    return null;
  }
}

function updateUserContext(userId, question, answer) {
  const previous = USER_CONTEXT.get(userId);
  const previousMessages =
    previous && previous.expiresAt > Date.now() ? previous.messages : [];

  const nextMessages = [
    ...previousMessages,
    { role: "user", content: question },
    { role: "assistant", content: answer },
  ].slice(-MAX_CONTEXT_MESSAGES);

  USER_CONTEXT.set(userId, {
    messages: nextMessages,
    expiresAt: Date.now() + CONTEXT_TTL_MS,
  });
}

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
