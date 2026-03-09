export default {
  name: "askbetter",
  description: "Guidelines on how to ask a quality question",
  aliases: ["askbetterfirst", "how2ask", "howtoask", "ask"],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        `✍️ **Ask Better Questions:** When asking for help, include clear details about your problem, what you're trying to do, what you expected to happen, what actually happened, and any relevant code or errors. This helps others understand your issue and provide useful answers faster.
https://stackoverflow.com/help/how-to-ask`,
      );
    } catch (err) {
      console.error(err);
    }
  },
};
