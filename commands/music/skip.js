module.exports = {
  name: "skip",
  description: "skips the current song playing",
  argsRequired: false,
  guildOnly: true,
  usage: "-skip",
  alias: [],
  run: async (client, message, args, Manager) => {
    const player = await Manager.get(message.guildID);
    if (!player) {
      return client.createMessage(
        message.channel.id,
        message.author.mention + " No songs are playing!"
      );
    }

    player.stop();
    return client.createMessage(
      message.channel.id,
      message.author.mention + " Skipped the song!"
    );
  },
};
