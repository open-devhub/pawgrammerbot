export default {
  name: 'voice',
  description: 'Rules for voice channel behavior',
  aliases: ['vc'],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        '🔊 **Voice Channel Rules:** Please keep your microphone clear and avoid playing loud music or noises in the voice channels. Be respectful of others who are trying to talk, and do not hop between channels to disrupt conversations. If you are sharing your screen, ensure the content is appropriate for the channel.',
      );
    } catch (err) {
      console.error(err);
    }
  },
};
