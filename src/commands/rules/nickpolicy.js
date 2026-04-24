export default {
  name: 'nickpolicy',
  description: 'Rules regarding nicknames (no pings/offensive content)',
  aliases: ['nicknamepolicy', 'nicknames'],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        '🏷️ **Nickname Policy:** Please ensure your nickname is mentionable, non-offensive, and does not contain "ghost pings" or deceptive formatting. If your name makes it difficult for others to tag you or moderators to manage the server, you may be asked to change it. We want to keep the member list readable and professional.',
      );
    } catch (err) {
      console.error(err);
    }
  },
};
