export default {
  name: 'flame',
  description: 'Rule against flaming or toxicity',
  aliases: ['toxic', 'toxicity'],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        '🔥 **No Flaming:** Aggressive behavior, insults, and toxicity toward other members will not be tolerated. Even if you disagree with someone’s approach, please keep your critiques constructive and professional. We aim to maintain a welcoming environment for developers of all skill levels.',
      );
    } catch (err) {
      console.error(err);
    }
  },
};
