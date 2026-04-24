import getConfig from "../../utils/getConfig.js";

export default {
  name: "rules",
  description: "Sends link to rule channel",
  aliases: ["rule", "communityrules", "rtfr"],
  callback: async (client, message, args) => {
    try {
      const config = await getConfig();
      const rulesChannel = config.serverConfig.rulesChannel;
      const info = `Rules aren’t here to kill the vibe, they’re here to keep the community strong. Please have a quick peek at ${rulesChannel ? `<#${rulesChannel}>` : "the rules"} when you can.`;
      return message.channel.send(info);
    } catch (err) {
      console.error("Error sending rules channel info:", err);
    }
  },
};
