export default {
  name: "noattempt",
  description: "User has shown no attempt at solving the problem",
  callback: async (client, message) => {
    try {
      return message.channel.send(
        `⚠️ **Show Your Attempt:** Please show what you've already tried to solve the problem. This helps others understand where you're stuck and prevents repeating things you've already attempted.
http://idownvotedbecau.se/noattempt/`,
      );
    } catch (err) {
      console.error(err);
    }
  },
};
