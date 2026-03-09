export default {
  name: "imageofcode",
  description: "Asking for text instead of code images",
  aliases: ["pictureofcode", "imgofcode"],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        `❌ **Don't Post Images of Code:** Code should be shared as text inside code blocks so others can read, copy, and test it. Images of code are difficult to work with.
https://idownvotedbecau.se/imageofcode/`,
      );
    } catch (err) {
      console.error(err);
    }
  },
};
