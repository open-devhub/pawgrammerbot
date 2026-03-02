export default {
  name: 'backseat',
  description: 'Rule against unsolicited advice or "backseat" coding',
  callback: async (client, message) => {
    try {
      return message.channel.send(
        "✋ **No Backseat Coding:** Please refrain from giving unsolicited advice or taking over someone else's troubleshooting process unless they ask for it. It can be confusing for the person receiving help and disruptive to the current flow of the conversation. Let the helper and the user work through the problem at their own pace.",
      );
    } catch (err) {
      console.error(err);
    }
  },
};
