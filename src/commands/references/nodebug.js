export default {
  name: "nodebugging",
  description: "User has not attempted to debug",
  aliases: ["nodebug"],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        `🔎 **Try Debugging First:** Before asking for help, try debugging your code, read the errors, add logs, and test parts of your program to narrow down the issue. Showing your debugging attempts helps others assist you better.
http://idownvotedbecau.se/nodebugging/
`,
      );
    } catch (err) {
      console.error(err);
    }
  },
};
