const Eris = require("eris");
const Eralajs = require("erela.js");

module.exports = {
  name: "play",
  description: "play something in a voice channel",
  alias: [],
  run: async (client, message, args, Manager) => {
    let argugments;
    if (
      typeof message.content === "string" ||
      message.content instanceof String
    ) {
      argugments = message.content.slice("-".length).trim().split(/ +/);
    }

    const channel = message.member.voiceState.channelID;
    if (!channel) {
      return client.createMessage(
        message.channel.id,
        message.author.mention +
          " You can only be in a voice channel to use this command!"
      );
    }

    let res;
    let search = argugments.join(" ");
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
      client.createMessage(
        message.channel.id,
        message.author.mention + " The owner hasn't set up Lavalink yet"
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
        meesage.channel.id,
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
