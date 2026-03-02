export default {
  name: 'image',
  description: 'General rule on image usage in chat',
  aliases: ['images'],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        '🖼️ **Image Usage:** Please avoid posting large or frequent images that disrupt the flow of the conversation. If an image is necessary for context, ensure it is relevant and properly explained. For code or errors, please use text blocks instead of screenshots so they are accessible to everyone.',
      );
    } catch (err) {
      console.error(err);
    }
  },
};
