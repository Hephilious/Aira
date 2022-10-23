module.exports = {
  name: "stop",
  description: "kills the player",
  alias: [],
  run: async (client, message, args, Manager) => {
    const player = await Manager.get(message.guildID);
    if (!player) {
      return client.createMessage(
        message.channel.id,
        message.author.mention + " No songs are playing!"
      );
    }
    const channel = message.member.voiceState.channelID;

    if (!channel) {
      return client.createMessage(
        message.channel.id,
        message.author.mention +
          " You need to be in a channel to use this command!"
      );
    }

    if (channel !== player.voiceChannel) {
      return client.createMessage(
        message.channel.id,
        message.author.mention +
          " You need to be in the same channel as me to use this command!"
      );
    }
    player.destroy();
    return client.createMessage(
      message.channel.id,
      message.author.mention + " Stopped all songs!"
    );
  },
};
