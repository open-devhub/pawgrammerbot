import fetch from "node-fetch";

export default {
  name: "articles",
  description: "Latest developer news headlines",
  aliases: ["devposts", "devarticles", "programmingarticles", "devto"],
  react: "🔥",
  callback: async (client, message, args) => {
    try {
      const res = await fetch("https://dev.to/api/articles?per_page=5");
      const articles = await res.json();

      if (!articles || articles.length === 0) {
        return message.channel.send("No developer articles found.");
      }

      const embed = {
        title: "Latest Dev.to Articles",
        color: 0x0099ff,
        // fields: articles.slice(0, 3).map((article) => ({
        //   name: article.title,
        //   value: `${article.description || ""}\n[Read more](${article.url})\n`,
        // })),

        description: articles
          .slice(0, 5)
          .map(
            (article) =>
              `### ${article.title}\n${article.description || ""} [Read more](${article.url})`,
          )
          .join("\n\n"),
        footer: { text: "Source: dev.to" },
      };

      return message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      return message.channel.send("Error fetching devto articles.");
    }
  },
};
