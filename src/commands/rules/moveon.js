export default {
  name: 'moveon',
  description: 'Request to end a toxic or circular argument',
  aliases: ['cc'],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        '🛑 **Move On:** This conversation has become circular or overly heated, and it is no longer productive. We ask that all parties involved drop the subject and move on to a different topic. Continuing to argue after this warning may result in moderator intervention.',
      );
    } catch (err) {
      console.error(err);
    }
  },
};
