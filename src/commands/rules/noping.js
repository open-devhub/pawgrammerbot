export default {
  name: 'noping',
  description: 'Rule against unnecessarily pinging staff or users',
  aliases: ['ping', 'nopings'],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        '🔔 **No Unnecessary Pings:** Please avoid pinging individual staff members or users unless it is an emergency or they have specifically asked you to. Pinging people for general help is often seen as rude and disruptive to their own work. Just post your question, and someone will respond when they are available.',
      );
    } catch (err) {
      console.error(err);
    }
  },
};
