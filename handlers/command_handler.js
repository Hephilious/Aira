const { Interaction } = require("eris");
const Eris = require("eris");
const fs = require("fs");

module.exports = (bot, Eris, Manager, guildID) => {
  const load_dirs = (dirs) => {
    const command_files = fs
      .readdirSync(`./commands/${dirs}/`)
      .filter((file) => file.endsWith(".js"));
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
