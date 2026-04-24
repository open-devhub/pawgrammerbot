export default {
  name: 'selfbot',
  description: 'Strict rule against self-bots',
  aliases: ['selfbots'],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        '🚫 **No Self-Bots:** Using your user token to automate your Discord account (self-botting) is a severe violation of Discord’s Terms of Service. It can result in a permanent ban of your account by Discord. We do not provide any support for self-bots and will remove any discussion related to them.',
      );
    } catch (err) {
      console.error(err);
    }
  },
};
