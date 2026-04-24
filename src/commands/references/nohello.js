export default {
  name: "nohello",
  description: "Dont just say hello, ask the question",
  callback: async (client, message) => {
    try {
      return message.channel.send(
        `👋 **Don't Just Say Hello:** Instead of only saying “hello” or “hi,” please ask your question directly. This helps others understand your issue immediately and respond faster.
https://www.nohello.net/`,
      );
    } catch (err) {
      console.error(err);
    }
  },
};
