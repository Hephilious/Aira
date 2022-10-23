const fs = require("fs");

module.exports = (Eris, bot, Manager, guildID, Interaction) => {
  if (Interaction instanceof Eris.CommandInteraction) {
    const slash_command_files = fs
      .readdirSync("./slash_commands/")
      .filter((file) => file.endsWith(".js"));
    slash_command_files.forEach((file) => {
      const slash_command = require(`../../slash_commands/${file}`);
      if (Interaction.data.name == slash_command.name) {
        const args = Interaction.data.options;

        /* Interaction.data.array().map((x) => {
          args.push(x.value);
        }); */
        return slash_command.run(bot, Interaction, args);
      }
    });
  }
};
