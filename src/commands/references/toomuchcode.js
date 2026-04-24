export default {
  name: "toomuchcode",
  description: "User posted an entire project",
  callback: async (client, message) => {
    try {
      return message.channel.send(
        `📦 **Too Much Code:** Please avoid posting an entire project. Instead, share only the **smallest portion of code** needed to reproduce the issue.
http://idownvotedbecau.se/toomuchcode/`,
      );
    } catch (err) {
      console.error(err);
    }
  },
};
