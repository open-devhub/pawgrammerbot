export default {
  name: "github",
  description: "GitHub organization link",
  aliases: [
    "gh",
    "opendevhub",
    "opendvh",
    "githublink",
    "githuborg",
    "org",
    "organization",
  ],
  callback: async (client, message, args) => {
    try {
      return message.channel.send("https://github.com/open-devhub");
    } catch (err) {}
  },
};
