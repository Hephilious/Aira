module.exports = {
  name: "ticket",
  description: "testing command",
  argsRequired: true,
  guildOnly: true,
  usage: "Use $help ticket command to get an embed of the command usage",
  alias: [],
  run: async (client, message, args, Manager, db) => {
    const ticketSet = require("./ticketSet");
    const ticketCreate = require("./ticketCreate");
    const { RecordError } = require("surrealdb.js");
    const { CategoryChannel } = require("eris");
    const guild = client.guilds.get(message.guildID);

    ticketSet.run(client, message, args, db);
    ticketCreate.run(client, message, args, db);
  },
};
