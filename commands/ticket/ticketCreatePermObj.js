module.exports = {
  run: async (client, message, db) => {
    const { RecordError } = require("surrealdb.js");
    const { CategoryChannel } = require("eris");
    const guild = client.guilds.get(message.guildID);
    let mod;
    try {
      mod = await db.select(`guilds:${guild.id}`);
    } catch (err) {
      if (err.name == "RecordError") {
        return [
          {
            allow: 309237697600n,
            deny: 0n,
            id: "513408890965327903",
            type: 1,
          },
          {
            allow: 0n,
            deny: 1049600n,
            id: message.author.id,
            type: 0,
          },
        ];
      } else {
        return console.log(err);
      }
    }

    return [
      {
        allow: 309237697600n,
        deny: 0n,
        id: "513408890965327903",
        type: 1,
      },
      {
        allow: 0n,
        deny: 1049600n,
        id: message.author.id,
        type: 0,
      },
      {
        allow: 2351972034n,
        deny: 0n,
        id: mod,
        type: 0,
      },
    ];
  },
};
