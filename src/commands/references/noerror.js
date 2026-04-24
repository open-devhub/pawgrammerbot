export default {
  name: "noerror",
  description: "User did not provide the error message",
  callback: async (client, message) => {
    try {
      return message.channel.send(
        `⚠️ **Missing Error Message:** If your code produces an error, please include the full error message. It often contains important clues about what went wrong.
http://idownvotedbecau.se/noerror/`,
      );
    } catch (err) {
      console.error(err);
    }
  },
};
