module.exports = {
  name: "play",
  description: "play something in a voice channel",
  argsRequired: true,
  guildOnly: true,
  usage: "-play <url | search>",
  invalidUsageMessage:
    "Use -help play command to get an embed of the command usage",
  alias: [],
  run: async (client, message, args, Manager) => {
    const channel = message.member.voiceState.channelID;
    if (!channel) {
      return client.createMessage(
        message.channel.id,
        message.author.mention +
          " You can only be in a voice channel to use this command!"
      );
    }

    let res;
    let search = args[0];
    if (!search) {
      return client.createMessage(
        message.channel.id,
        message.author.mention + " Please provide something to play!"
      );
    }
    try {
      const player = Manager.create({
        guild: message.guildID,
        voiceChannel: channel,
        textChannel: message.channel.id,
        selfDeafen: true,
      });
    } catch (err) {
      const owner = await client.getDMChannel("350444313236471819");
      client.createMessage(
        message.channel.id,
        message.author.mention +
          " The owner as of yet has not set up Lavalink(I will notify him)."
      );
      client.createMessage(
        owner.id,
        `${owner.recipient.mention} Set up Lavalink idiot!`
      );
      return console.log("Set up lava linker idiot");
    }
    const player = Manager.create({
      guild: message.guildID,
      voiceChannel: channel,
      textChannel: message.channel.id,
      selfDeafen: true,
    });

    if (player.state != "CONNECTED") await player.connect();

    res = await player.search(search, message.author);
    console.log(res);
    if (res.loadType == "NO_MATCHES") {
      return client.createMessage(
        message.channel.id,
        message.author.mention +
          " I couldn't find anything that matches your search/URL"
      );
    } else if (res.loadType == "PLAYLIST_LOADED") {
      player.queue.add(res.tracks);
      if (
        !player.playing ||
        !player.paused ||
        player.queue.totalSize === res.tracks.length
      ) {
        player.play();
      }
    } else {
      player.queue.add(res.tracks[0]);
      if (!player.playing || !player.paused || player.queue.size) {
        player.play();
      }
    }
  },
};
