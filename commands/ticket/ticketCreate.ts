import { Guild } from "eris";

module.exports = {
  run: async (client, message, args, db) => {
    const createPerm = require("./ticketCreatePermObj");
    const guild: Guild = client.guilds.get(message.guildID);
    let shouldContinue: boolean;
    if (args[0] == "create") {
      let guilds;
      let ticketCategory: String;
      try {
        guilds = await db.select(`guilds:${guild.id}`);
        ticketCategory = guilds[0].categories.ticket;
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
