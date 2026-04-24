export default {
  name: "tos",
  description: "Discord Terms of Service",
  aliases: ["terms", "termsofservice", "discordtos", "guidelines", "guideline"],
  callback: async (client, message, args) => {
    try {
      return message.channel
        .send(`[Community Guidelines](https://discord.com/guidelines): Helps to set expectations for behavior and keep communities safe.
[Terms of Service](https://discord.com/terms): Explains the legal rules for using Discord.`);
    } catch (err) {}
  },
};
