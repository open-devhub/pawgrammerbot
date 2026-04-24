export default {
  name: "itsnotworking",
  description: 'Asking for more detail than "it is not working"',
  aliases: ["itdoesntwork", "notworking", "doesntwork"],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        `⚠️ **"It's Not Working" Isn't Enough:** Simply saying something isn't working doesn't give enough information. Please explain what you expected, what happened instead, and include any relevant code or errors.
http://idownvotedbecau.se/itsnotworking/`,
      );
    } catch (err) {
      console.error(err);
    }
  },
};
