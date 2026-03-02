export default {
  name: 'chatgpt',
  description: 'Policy on AI-generated code (ChatGPT, Claude, etc.)',
  aliases: ['cursor', 'claude', 'copilot'],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        '🤖 **AI Policy:** While AI tools like ChatGPT or Claude can be helpful, they often produce outdated or confidently incorrect code for specific libraries. If you are posting AI-generated code that doesn\'t work, please disclose it so we don\'t waste time debugging "hallucinations." We prefer helping with code you have written or at least fundamentally understand yourself.',
      );
    } catch (err) {
      console.error(err);
    }
  },
};
