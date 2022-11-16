import Surreal from "surrealdb.js";

module.exports = async (Eris, bot, Manager, guildID, db: Surreal) => {
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
      bot.createCommand({
        name: slash_command.name,
        type: Eris.Constants.ApplicationCommandOptionTypes.CHAT_INPUT,
        description: slash_command.description,
        options: slash_command.options,
      });
    });
  } catch (err) {
    console.log(err);
  }
  let numOfGuilds: number = bot.guilds.size;
  try {
    let updated = await db.change(`insights:${bot.user.id}`, {
      guilds: numOfGuilds,
    });
    console.log(updated);
  } catch (err) {
    console.log(err);
    if (err.name == "RecordError") {
      bot.gulds.array.forEach((element) => {
        numOfGuilds++;
      });
      let insightCreate = await db.create(`insights:${bot.user.id}`, {
        guilds: numOfGuilds,
      });
    }
  }
};
