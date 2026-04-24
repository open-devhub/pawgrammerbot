export default {
  name: "unclearquestion",
  description: "The question makes no sense",
  callback: async (client, message) => {
    try {
      return message.channel.send(
        `❓ **Unclear Question:** Your question is difficult to understand. Please clarify what you're trying to do, include relevant code, and explain the issue more clearly.
http://idownvotedbecau.se/unclearquestion/`,
      );
    } catch (err) {
      console.error(err);
    }
  },
};
