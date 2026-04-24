export default {
  name: 'english',
  description: 'Request to use English for technical support',
  callback: async (client, message) => {
    try {
      return message.channel.send(
        '🌐 **English Only:** To ensure that our moderation and support teams can effectively assist you, we ask that you use English in this channel. This allows the largest number of members to understand your question and provide accurate feedback. If you are more comfortable in another language, please check if there is a specific international channel available.',
      );
    } catch (err) {
      console.error(err);
    }
  },
};
