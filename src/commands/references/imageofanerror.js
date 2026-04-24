export default {
  name: "imageofanerror",
  description: "Asking for text instead of error images",
  aliases: ["imageofexception"],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        `❌ **Don't Post Images of Errors:** Please copy and paste the error text into a code block so others can read, search, and debug it properly. Images of errors make troubleshooting harder.
https://idownvotedbecau.se/imageofatextualerror/`,
      );
    } catch (err) {
      console.error(err);
    }
  },
};
