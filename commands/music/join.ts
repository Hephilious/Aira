module.exports = {
  name: "join",
  description: "join vc",
  argsRequired: false,
  guildOnly: true,
  usage: "$join",
  alias: [],
  run: async (client, message, args) => {
    try {
      let voiceChannel = message.member.voiceState.channelID;
      client.joinVoiceChannel(voiceChannel, {
        selfDeaf: true,
      });
    } catch (err) {
      console.log(message.member.voiceState.channelID);
      console.log(err);
    }
  },
};
