module.exports = {
  name: "echo",
  description: "Makes the bot say something in any channel of your choosing",
  options: [
    {
      name: "channel",
      description: "Channel targeted to",
      type: 7,
      required: true,
    },
    {
      name: "message",
      description: "Message of your choosing",
      type: 3,
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const [channel, message] = args;
    const channelToSend = interaction.member.guild.channels.get(channel.value);
    channelToSend.createMessage(`${message.value}`);
    return interaction.createMessage(
      `Your message has been sent to that channel`
    );
  },
};
