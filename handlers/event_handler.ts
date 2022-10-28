module.exports = (bot, Eris, Manager, guildID, db) => {
  const fs = require("fs");
  const load_dir = (dirs) => {
    const event_files = fs
      .readdirSync(`./events/${dirs}`)
      .filter((file) => file.endsWith(".ts"));

    event_files.forEach((file) => {
      const event = require(`../events/${dirs}/${file}`);
      const event_name = file.split(".")[0];
      bot.on(event_name, event.bind(null, Eris, bot, Manager, guildID, db));
    });
  };
  ["bot", "manager"].forEach((e) => load_dir(e));
};
