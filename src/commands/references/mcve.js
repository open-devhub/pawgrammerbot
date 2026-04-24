export default {
  name: "mcve",
  description: "Minimal Complete Verifiable Example",
  aliases: ["mvce"],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        `🧪 **Provide an MCVE:** When asking for help, try to share a **Minimal, Complete, Verifiable Example** of your issue. This means the smallest amount of code needed to reproduce the problem.
https://stackoverflow.com/help/minimal-reproducible-example`,
      );
    } catch (err) {
      console.error(err);
    }
  },
};
