export default {
  name: 'hacks',
  description: 'Rule against discussing hacking or unauthorized access',
  aliases: ['hacking', 'cracking'],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        '🛡️ **No Hacking:** Discussion of hacking, "cracking," or gaining unauthorized access to services is strictly prohibited. We do not support activities that compromise the security of others or violate legal boundaries. Any mention of malicious software or exploit development will result in immediate action.',
      );
    } catch (err) {
      console.error(err);
    }
  },
};
