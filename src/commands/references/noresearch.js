export default {
  name: "noresearch",
  description: "User has not searched for the answer",
  aliases: ["research"],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        `🔍 **Try Researching First:** Before asking a question, try searching online or checking documentation. If you still can't find the answer, mention what you've already looked at.
http://idownvotedbecau.se/noresearch/`,
      );
    } catch (err) {
      console.error(err);
    }
  },
};
