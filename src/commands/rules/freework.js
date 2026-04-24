export default {
  name: 'freework',
  description: 'Rule against asking people to code for you for free',
  aliases: ['labor'],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        '🛠️ **No Requests for Free Work:** This is a place to learn and get help with your own code, not a place to recruit developers for free labor. Please do not ask members to build entire projects or complex features for you. If you want to learn, show us what you have tried, and we will guide you through the process.',
      );
    } catch (err) {
      console.error(err);
    }
  },
};
