export default {
  name: 'dm',
  description: 'Rule against asking for DMs for help',
  aliases: ['nodm'],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        '📥 **No DM Requests:** Please keep all help-related discussions in the public channels rather than asking for private DMs. Keeping the conversation public allows others to learn from the solution and ensures that multiple people can jump in to help. It also protects the community from potential scams or harassment.',
      );
    } catch (err) {
      console.error(err);
    }
  },
};
