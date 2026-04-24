export default {
  name: 'crypto',
  description: 'Policy on crypto, NFT, and blockchain discussion',
  aliases: ['nft', 'blockchain', 'web3'],
  callback: async (client, message) => {
    try {
      return message.channel.send(
        '🪙 **Crypto/Web3 Policy:** We do not provide support for cryptocurrency, NFT, or blockchain-related projects in this server. These topics often attract spam and high-risk content that we prefer to keep out of our development discussions. Please seek out specialized communities for help with Web3 or smart contract development.',
      );
    } catch (err) {
      console.error(err);
    }
  },
};
