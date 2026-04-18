import { clearUserContext } from "../../utils/chat-context.js";

export default {
  name: "resetai",
  description: "Clear your AI conversation context",
  aliases: ["aiclear", "clearai", "aireset", "reset"],
  callback: async (client, message) => {
    try {
      if (message.author.bot) return;

      const didClear = clearUserContext(message.author.id);
      if (didClear) {
        await message.reply("Your AI conversation context has been cleared.");
        return;
      }

      await message.reply("No AI conversation context was found to clear.");
    } catch (err) {
      console.error(err);
      await message.reply("Could not clear your AI context right now.");
    }
  },
};
