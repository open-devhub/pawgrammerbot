export default {
  name: "xyproblem",
  description: "The XY Problem",
  aliases: ["xy"],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        `🧩 **The XY Problem:** You're asking about a solution instead of the actual problem you're trying to solve. Try explaining the **original goal** so people can suggest better solutions.
https://xyproblem.info/`,
      );
    } catch (err) {
      console.error(err);
    }
  },
};
