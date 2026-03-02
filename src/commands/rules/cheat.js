export default {
  name: 'cheat',
  description: 'Rule against asking for help with cheating',
  aliases: ['cheating'],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        '🚫 **No Cheating:** This community does not support or facilitate any form of academic dishonesty or cheating on technical assessments. Please do not ask us to complete your graded assignments or interview questions for you. We are here to help you learn, not to help you bypass the learning process.',
      );
    } catch (err) {
      console.error(err);
    }
  },
};
