import { AttachmentBuilder } from "discord.js";
import { fetchStock } from "../../tools/get-stock.js";
import { renderStockCard } from "../../utils/stock-card.js";

export default {
  name: "stock",
  description: "Show a price card + chart for a stock, ETF, or crypto pair",
  aliases: ["ticker", "price"],
  callback: async (client, message, args) => {
    try {
      if (message.author.bot) return;

      const symbol = String(args[0] || "").trim();
      if (!symbol) {
        await message.reply(
          "Usage: `$stock AAPL` — pass a ticker symbol (e.g. `$stock TSLA`, `$stock BTC/USD`).",
        );
        return;
      }

      await message.channel.sendTyping();

      let data;
      try {
        data = await fetchStock(symbol);
      } catch (err) {
        const msg = String(err?.message || err);
        if (msg.includes("TWELVE_DATA_API_KEY")) {
          await message.reply(
            "Stock lookups aren't configured yet. Add `TWELVE_DATA_API_KEY` to the environment and restart the bot.",
          );
          return;
        }
        await message.reply(
          `Couldn't find data for \`${symbol.toUpperCase()}\`. Double-check the ticker symbol.`,
        );
        return;
      }

      const buffer = renderStockCard({
        symbol: data.symbol,
        name: data.name,
        exchange: data.exchange,
        currency: data.currency,
        price: data.price,
        change: data.change,
        percentChange: data.percentChange,
        series: data.series,
        brand: "Rael",
      });

      const attachment = new AttachmentBuilder(buffer, {
        name: `stock-${data.symbol}.png`,
      });

      await message.reply({ files: [attachment] });
    } catch (err) {
      console.error("Stock command error:", err);
      await message.reply("Could not generate the stock card right now.");
    }
  },
};
