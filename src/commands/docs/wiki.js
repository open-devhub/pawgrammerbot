import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";
import fetch from "node-fetch";

export default {
  name: "wiki",
  description: "Search Wikipedia",
  aliases: ["wikipedia", "wikisearch"],
  react: "📚",
  callback: async (client, message, args) => {
    try {
      const query = args.join(" ");
      if (!query) {
        return message.channel.send(
          "Please provide a search term, e.g. `++wiki JavaScript`",
        );
      }

      const controller1 = new AbortController();
      const timeoutId1 = setTimeout(() => controller1.abort(), 10000);
      const res = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
          query,
        )}&utf8=&format=json`,
        { signal: controller1.signal, timeout: 10000 },
      );
      clearTimeout(timeoutId1);
      const data = await res.json();

      if (!data.query || !data.query.search || data.query.search.length === 0) {
        return message.channel.send(
          `¯\\_(ツ)_/¯ No Wikipedia results found for **${query}**`,
        );
      }

      const article = data.query.search[0];
      const title = article.title;
      const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;

      const controller2 = new AbortController();
      const timeoutId2 = setTimeout(() => controller2.abort(), 10000);
      const pageRes = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&exintro=true&explaintext=true&piprop=thumbnail&pithumbsize=300&format=json&titles=${encodeURIComponent(title)}`,
        { signal: controller2.signal, timeout: 10000 },
      );
      clearTimeout(timeoutId2);
      const pageData = await pageRes.json();
      const page = Object.values(pageData.query.pages)[0];
      const extract = page.extract || "No extract available.";
      const thumbnail = page.thumbnail ? page.thumbnail.source : null;

      const embed = new EmbedBuilder()
        .setTitle(title)
        .setURL(url)
        .setDescription(
          extract.length > 800
            ? extract.slice(0, extract.lastIndexOf(" ", 800)) + " ..."
            : extract,
        )
        .setFooter({ text: "Source: wikipedia.org" });
      if (thumbnail) embed.setThumbnail(thumbnail);

      const button = new ButtonBuilder()
        .setLabel("Read on Wikipedia")
        .setStyle(ButtonStyle.Link)
        .setURL(url);
      const row = new ActionRowBuilder().addComponents(button);

      return message.channel.send({ embeds: [embed], components: [row] });
    } catch (err) {
      if (err.name === "AbortError" || err.code === "ETIMEDOUT") {
        return message.channel.send(
          "Request timed out. Please try again later.",
        );
      } else {
        console.error(err);
        return message.channel.send("Error fetching Wikipedia articles.");
      }
    }
  },
};
