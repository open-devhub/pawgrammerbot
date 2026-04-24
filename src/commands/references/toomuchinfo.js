export default {
  name: "toomuchinfo",
  description: "Post contains irrelevant information",
  callback: async (client, message) => {
    try {
      return message.channel.send(
        `ℹ️ **Too Much Information:** Try to remove unrelated details and focus on the parts of your problem that are directly relevant.`,
      );
    } catch (err) {
      console.error(err);
    }
  },
};
