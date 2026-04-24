export default {
  name: "nocode",
  description: "User provided no code",
  aliases: ["showcode", "postcode"],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        `⚠️ **No Code Provided:** It's hard to help without seeing the code related to your issue. Please include the relevant parts of your code when asking for help.
http://idownvotedbecau.se/nocode/`,
      );
    } catch (err) {
      console.error(err);
    }
  },
};
