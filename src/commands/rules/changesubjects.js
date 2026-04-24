export default {
  name: 'changesubjects',
  description: 'Rule against changing the subject mid-help',
  aliases: ['changesubject', 'changetopic'],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        '🔄 **One Topic at a Time:** Please avoid changing the subject or asking unrelated questions while someone is currently helping you with a specific issue. Switching topics abruptly makes it difficult for helpers to track the progress of your original problem. Once your current issue is resolved, feel free to start a new discussion or move to the appropriate channel.',
      );
    } catch (err) {
      console.error(err);
    }
  },
};
