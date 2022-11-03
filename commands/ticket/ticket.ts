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
    const ticketClose = require("./ticketClose");
    const ticketAdd = require("./ticketAdd");
    const ticketRemove = require("./ticketRemove");

    ticketSet.run(client, message, args, db);
    ticketCreate.run(client, message, args, db);
    ticketClose.run(client, message, args, db);
    ticketAdd.run(client, message, args, db);
    ticketRemove.run(client, message, args, db);
  },
};
