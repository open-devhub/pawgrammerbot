export default {
  name: "sask",
  description: "Short Ask - asking to ask",
  callback: async (client, message) => {
    try {
      return message.channel.send(
        `❓ **Short Ask (SASK):** Instead of asking if someone knows about a topic, briefly describe your actual problem right away so people can help immediately.`,
      );
    } catch (err) {
      console.error(err);
    }
  },
};
