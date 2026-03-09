export default {
  name: "dontasktoask",
  description: "dontasktoask.com",
  aliases: ["ask", "dontasktoaskjustask"],
  callback: async (client, message, args) => {
    try {
      return message.channel.send(
        `❌ **Don't Ask to Ask:** Instead of asking if you can ask a question, just ask it directly. This saves time and helps people immediately understand what you need help with.
https://dontasktoask.com/`,
      );
    } catch (err) {}
  },
};
