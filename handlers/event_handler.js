const { Interaction } = require("eris");
const fs = require("fs");
module.exports = (bot, Eris, Manager, guildID) => {
  const load_dir = (dirs) => {
    const event_files = fs
      .readdirSync(`./events/${dirs}`)
      .filter((file) => file.endsWith(".js"));

    event_files.forEach((file) => {
      const event = require(`../events/${dirs}/${file}`);
      const event_name = file.split(".")[0];
      bot.on(event_name, event.bind(null, Eris, bot, Manager, guildID));
    });
  };
  ["bot", "manager"].forEach((e) => load_dir(e));
};
