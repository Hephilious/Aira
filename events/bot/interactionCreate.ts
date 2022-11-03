module.exports = (Eris, bot, Manager, guildID, db, Interaction) => {
  const fs = require("fs");

  const { ComponentInteraction, CommandInteraction } = require("eris");
  if (Interaction instanceof CommandInteraction) {
    const slash_command_files = fs
      .readdirSync("./slash_commands/")
      .filter((file) => file.endsWith(".ts"));
    slash_command_files.forEach((file) => {
      const slash_command = require(`../../slash_commands/${file}`);
    });
  }
  if (Interaction instanceof ComponentInteraction) {
    const components_interaction_files = fs
      .readdirSync("./commands/general/")
      .filter((file) => file.endsWith(".ts"));
    components_interaction_files.forEach((file) => {
      const components_interaction = require(`../../commands/general/${file}`);
      if (components_interaction.button_ids) {
        components_interaction.button_ids.forEach((element) => {
          console.log(element);
          if (Interaction.data.custom_id == element.name) {
            return element.run(Interaction);
          }
        });
      }
    });
  }
};
