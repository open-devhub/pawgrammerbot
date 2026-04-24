import fetch from "node-fetch";

export default {
  name: "news",
  description: "Latest developer/tech news headlines",
  aliases: ["devnews", "technews", "programmingnews"],
  react: "🔥",
  callback: async (client, message, args) => {
    try {
      const apiKey = process.env.NEWSAPI_KEY;
      const query = args[0] || "programming";
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=popularity&apiKey=${apiKey}`;

      const res = await fetch(url);
      const data = await res.json();

      if (!data.articles || data.articles.length === 0) {
        return message.channel.send("No news found.");
      }

      const embed = {
        title: `Latest News on "${query}"`,
        color: 0x0099ff,
        description: data.articles
          .slice(0, 5)
          .map(
            (article) =>
              `### ${article.title}\n${article.description || ""} [Read more](${article.url})`,
          )
          .join("\n\n"),
        footer: { text: "Source: NewsAPI.org" },
      };

      return message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      return message.channel.send("Error fetching news.");
    }
  },
};
