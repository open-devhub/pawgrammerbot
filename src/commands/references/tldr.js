export default {
  name: "tldr",
  description: "Too long, didn't read (requesting summary)",
  callback: async (client, message) => {
    try {
      return message.channel.send(
        `📚 **Too Long; Didn't Read:** Your message is very long. Try summarizing the key parts of your problem so others can understand it quickly.`,
      );
    } catch (err) {
      console.error(err);
    }
  },
};
