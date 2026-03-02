export default {
  name: 'exams',
  description: 'Rule against help with active exams/tests',
  aliases: ['noexams', 'noactiveexams'],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        '📝 **Active Exams:** We strictly prohibit asking for help with active exams, certifications, or timed tests. Providing assistance during an exam is a violation of academic and professional integrity. Any requests for help that appear to be part of a live test will be removed immediately.',
      );
    } catch (err) {
      console.error(err);
    }
  },
};
