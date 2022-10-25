module.exports = {
  name: "play",
  description: "play's a song of your choosing",
  options: [
    {
      name: "url",
      description: "Url for video or name of video",
      type: 3,
      required: true,
    },
  ],
  run: async (client, interaction, args, Manager) => {
    const [url] = args;
    //return interaction.createMessage(`Testing ${test.value}`);
    const channel = interaction.member.voiceState.channelID;
    if (!channel) {
      return interaction.createMessage(
        interaction.member.mention +
          " You can only be in a voice channel to use this command!"
      );
    }

    let res;
    let search = url.value;
    if (!search) {
      return client.createMessage(
        interaction.channel.id,
        interaction.member.mention + " Please provide something to play!"
      );
    }
    try {
      const player = Manager.create({
        guild: interaction.guildID,
        voiceChannel: channel,
        textChannel: interaction.channel.id,
        selfDeafen: true,
      });
    } catch (err) {
      interaction.createMessage(
        `${interaction.member.mention} The Owners has of yet to set up LavaLinker(I will notify him)`
      );
      const owner = await client.getDMChannel("350444313236471819");
      return client.createMessage(
        owner.id,
        `${owner.recipient.mention} Set up Lavalink idiot!`
      );
    }
    const player = Manager.create({
      guild: interaction.guildID,
      voiceChannel: channel,
      textChannel: interaction.channel.id,
      selfDeafen: true,
    });

    if (player.state != "CONNECTED") await player.connect();

    res = await player.search(search, interaction.member);
    console.log(res);
    if (res.loadType == "NO_MATCHES") {
      return interaction.createMessage(
        `${interaction.member.mention} I couldn't find anything that matches your search/URL`
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
    return interaction.createMessage(
      interaction.member.mention + " Your song is playing"
    );
  },
};
