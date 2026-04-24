import fetch from "node-fetch";
import TurndownService from "turndown";

const turndown = new TurndownService();

export default {
  name: "mdn",
  description: "Search MDN Web Docs",
  aliases: ["docs", "mozilla", "developer", "mdnsearch"],
  react: "📚",
  callback: async (client, message, args) => {
    try {
      const query = args.join(" ");
      if (!query) {
        return message.channel.send(
          "Please provide a search term, e.g. `++mdn WeakMap`",
        );
      }

      const res = await fetch(
        `https://developer.mozilla.org/api/v1/search?q=${encodeURIComponent(query)}&locale=en-US`,
      );
      const data = await res.json();

      if (!data.documents || data.documents.length === 0) {
        return message.channel.send(
          `¯\\_(ツ)_/¯ No MDN results found for **${query}**`,
        );
      }

      const doc = data.documents[0];
      const rawExcerpt = doc.excerpt || "";
      const markdownExcerpt = rawExcerpt ? turndown.turndown(rawExcerpt) : "";
      const url = `https://developer.mozilla.org${doc.mdn_url}`;

      return message.channel.send(`${doc.title}: ${url}\n${markdownExcerpt}`);
    } catch (err) {
      console.error(err);
      return message.channel.send("Error fetching MDN docs.");
    }
  },
};
