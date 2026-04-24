export default {
  name: 'scraping',
  description: 'Policy on web scraping and automation',
  aliases: ['webscraping', 'scrape', 'automation'],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        '🕸️ **Scraping Policy:** Please be aware that automated web scraping often violates the Terms of Service of the website being targeted. We do not provide support for bypassing bot protections (like Captchas) or scraping Discord itself (self-botting). Ensure your automation scripts follow legal and ethical guidelines before asking for help.',
      );
    } catch (err) {
      console.error(err);
    }
  },
};
