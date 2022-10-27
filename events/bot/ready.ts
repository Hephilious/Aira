module.exports = (Eris, bot, Manager, guildID) => {
  const fs = require("fs");
  let discriminator = bot.user.discriminator;
  let botname = bot.user.username;
  Manager.init(bot.user.id);
  console.log(`Bot ${botname}#${discriminator} has logged on`);
  bot.editStatus("dnd", { name: "Hephilious", type: 3 });
  try {
    const slash_command_files = fs
      .readdirSync("./slash_commands/")
      .filter((file) => file.endsWith(".ts"));
    slash_command_files.forEach((file) => {
      const slash_command = require(`../../slash_commands/${file}`);
      bot.createGuildCommand(guildID, {
        name: slash_command.name,
        type: Eris.Constants.ApplicationCommandOptionTypes.CHAT_INPUT,
        description: slash_command.description,
        options: slash_command.options,
      });
    });
  } catch (err) {
    console.log(err);
  }
  console.log(bot.commands.Command);
};
