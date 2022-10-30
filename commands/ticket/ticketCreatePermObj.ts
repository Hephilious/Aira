module.exports = {
  run: async (client, message, db) => {
    const guild = client.guilds.get(message.guildID);
    let mod;
    let pass: boolean = true;
    let overWrites: Array<Object>;
    try {
      mod = await db.select(`guilds:${guild.id}`)[0];
      console.log(mod.moderation);
    } catch (err) {
      if (err.name == "TypeError") {
        pass = false;
      } else {
        return console.log(err);
      }
    }
    if (pass) {
      overWrites = [
        {
          allow: 52288n,
          deny: 0n,
          id: message.author.id,
          type: 1,
        },
        {
          allow: 0n,
          deny: 1024n,
          id: "907099087101370418",
          type: 0,
        },
        {
          allow: 2351972034n,
          deny: 0n,
          id: mod,
          type: 0,
        },
      ];
      return overWrites;
    } else {
      overWrites = [
        {
          allow: 52288n,
          deny: 0n,
          id: message.author.id,
          type: 1,
        },
        {
          allow: 0n,
          deny: 1024n,
          id: "907099087101370418",
          type: 0,
        },
      ];
      return overWrites;
    }
  },
};
