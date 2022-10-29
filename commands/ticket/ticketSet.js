module.exports = {
  run: async (client, message, args, db) => {
    const { RecordError } = require("surrealdb.js");
    const { CategoryChannel } = require("eris");
    const guild = client.guilds.get(message.guildID);
    if (args[0] == "set") {
      if (args[1]) {
        let guildDB;
        let category = client.getChannel(args[1]);
        if (category instanceof CategoryChannel) {
          try {
            guildDB = await db.select(`guilds:${guild.id}`);
          } catch (err) {
            if (err.name == "RecordError") {
              guildDB = await db.create(`guilds:${guild.id}`, {
                name: guild.name,
                identifier: guild.id,
                categories: {
                  ticket: category.id,
                },
              });
            } else {
              return console.log(err);
            }
          } finally {
            let updated = await db.change(`guilds:${guild.id}`, {
              categories: {
                ticket: category.id,
              },
            });
            console.log(updated);
          }
          let embed = {
            title: "Category Change",
            author: {
              name: "Luminary",
              icon_url: "https://i.postimg.cc/gJc4pZb3/Luminary.png",
            },
            color: 0xf76233,
            description: `Your ticket category has been set/changed to the\n category ${category.name}, with an ID of ${category.id}!`,
          };
          return message.channel.createMessage({ embed: embed });
        } else {
          return message.channel.createMessage(
            `${message.author.mention}, Please Provide a valid ID!`
          );
        }
      }
      return message.channel.createMessage(
        `${message.author.mention}, Please specify a category ID!`
      );
    }
  },
};
