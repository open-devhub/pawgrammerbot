export default {
  name: 'spoon',
  description: 'Rule against "spoon-feeding" / asking to be spoon-fed',
  aliases: ['spoonfeed', 'spoonfeeding'],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        '🥄 **No Spoon-feeding:** We are here to help you learn, not to provide "copy-paste" solutions for everything. Please attempt to understand the logic behind the help you receive so you can apply it yourself in the future. We believe that guiding you to the answer is much more beneficial than just giving it to you.',
      );
    } catch (err) {
      console.error(err);
    }
  },
};
