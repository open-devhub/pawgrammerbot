import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";

export default {
  name: "user",
  description: "Get information about a GitHub user",
  callback(client, message, args) {
    try {
      const username = args[0];
      if (!username) {
        return message.reply("Please provide a GitHub username.");
      }

      // match URLs like:
      // https://github.com/username
      // username
      // github.com/username
      const match =
        username.match(
          /^(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)(?:\/([^\/]+))?(?:\.git)?$/i,
        ) || username.match(/^([^\/]+)$/);
      if (!match) {
        return message.reply("Please provide a valid GitHub username.");
      }
      const user = match[1];
      const apiUrl = `https://api.github.com/users/${user}`;

      fetch(apiUrl)
        .then((res) => {
          if (!res.ok) {
            throw new Error("User not found");
          }
          return res.json();
        })
        .then((data) => {
          const name = data.name;
          const bio = data.bio;
          const repos = data.public_repos || 0;
          const followers = data.followers || 0;
          const following = data.following || 0;

          const embed = new EmbedBuilder()
            .setAuthor({
              name: data.login,
              iconURL: data.avatar_url,
              url: data.html_url,
            })
            .setTitle(name || data.login)
            .setDescription(bio || "No bio")
            .setThumbnail(data.avatar_url)
            .addFields(
              { name: "Public Repos", value: repos.toString(), inline: true },
              { name: "Followers", value: followers.toString(), inline: true },
              { name: "Following", value: following.toString(), inline: true },
            )
            .setFooter({
              text: `Requested by ${message.author.tag}`,
              iconURL: message.author.displayAvatarURL(),
            });

          const button = new ButtonBuilder()
            .setLabel("View on GitHub")
            .setStyle(ButtonStyle.Link)
            .setURL(data.html_url);
          const row = new ActionRowBuilder().addComponents(button);

          message.reply({ embeds: [embed], components: [row] });
        })
        .catch((err) => {
          console.error(err);
          message.reply(
            "An error occurred while fetching the user information.",
          );
        });
    } catch (err) {
      console.error(err);
    }
  },
};
