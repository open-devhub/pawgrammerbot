export default {
  name: "tryit",
  description: "Try it and see / TIAS",
  aliases: ["tias"],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        `🧪 **Try It and See (TIAS):** Sometimes the best way to learn is to experiment. Try running the code or testing the idea yourself first and see what happens.`,
      );
    } catch (err) {
      console.error(err);
    }
  },
};
