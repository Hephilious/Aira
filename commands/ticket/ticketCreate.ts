import { Guild } from "eris";
import Surreal from "surrealdb.js";

module.exports = {
  run: async (client, message, args, db: Surreal) => {
    const createPerm = require("./ticketCreatePermObj");
    const guild: Guild = client.guilds.get(message.guildID);
    let shouldContinue: boolean;
    if (args[0] == "create") {
      let guilds;
      let ticketCategory: String;
      try {
        if (db.token) {
          guilds = await db.select(`guilds:${guild.id}`);
        } else {
          return message.channel.createMessage(
            `${message.author.mention}, My database is not up!(I require it to know which category I should put the ticket channels in!)`
          );
        }

        ticketCategory = guilds[0].categories.ticket;
        console.log(db);
      } catch (err) {
        if (err.name == "RecordError") {
          return message.channel
            .createMessage(`${message.author.mention}, You have to set the ticket category first!
To set the ticket category use \`$ticket set <categoryID>\`.
For more information use \`$help ticket set\`.`);
        } else {
          return console.log(err);
        }
      }
      let test = client.getChannel(ticketCategory);
      shouldContinue = true;
      test.channels.forEach((channel) => {
        if (channel.name == `ticket-${message.author.id}`) {
          shouldContinue = false;
          return message.channel
            .createMessage(`${message.author.mention}, You already have an open ticket!
    Close it first if you want to make a new one!`);
        }
      });
      let mod;
      if (shouldContinue) {
        let permission: Array<Object>;
        let perms: Promise<Array<Object>> = createPerm.run(client, message, db);
        await perms.then((f) => {
          permission = f;
        });
        let ticketChannel = await client.createChannel(
          guild.id,
          `ticket-${message.author.id}`,
          "0",
          {
            nsfw: false,
            parentID: ticketCategory,
            permissionOverwrites: permission,
          }
        );

        return message.channel
          .createMessage(`${message.author.mention}, I Opened a ticket called:
    ${ticketChannel.mention}`);
      }
    }
  },
};
