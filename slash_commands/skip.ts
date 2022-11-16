module.exports = {
  name: "skip",
  description: "Skips the current song playing from the bot",
  run: async (client, Interaction, args, Manager) => {
    const player = await Manager.get(Interaction.guildID);
    if (!player) {
      return Interaction.createMessage(
        Interaction.member.mention + " No songs are playing!"
      );
    }
    player.stop();
    return Interaction.createMessage(
      Interaction.member.mention + " Skipped the song!"
    );
  },
};
