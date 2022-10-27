module.exports = (bot, Eris, Manager, guildID) => {
  const fs = require("fs");
  const load_dirs = (dirs) => {
    const command_files = fs
      .readdirSync(`./commands/${dirs}/`)
      .filter((file) => file.endsWith(".ts"));
    command_files.forEach((file) => {
      const command = require(`../commands/${dirs}/${file}`);
      try {
        bot.registerCommand(
          command.name,
          async (message, args) => command.run(bot, message, args, Manager),
          {
            aliases: command.alias,
            description: command.description,
            argsRequired: command.argsRequired,
            guildOnly: command.guildOnly,
            usage: command.usage,
            invalidUsageMessage: command.invalidUsageMessage,
          }
        );
      } catch (err) {
        console.log(err);
        return console.log("Command already registered");
      }
    });
  };
  ["music", "general"].forEach((e) => load_dirs(e));
};
