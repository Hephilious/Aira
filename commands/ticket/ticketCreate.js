module.exports = {
  run: async (client, message, args, db) => {
    const { RecordError } = require("surrealdb.js");
    const { CategoryChannel } = require("eris");
    const createPerm = require("./ticketCreatePermObj.js");
    const guild = client.guilds.get(message.guildID);
    let shouldContinue;
    if (args[0] == "create") {
      let guilds;
      let ticketCategory;
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
        let perms = createPerm.run(client, message, db);
        let ticketChannel = await client.createChannel(
          guild.id,
          `ticket-${message.author.id}`,
          "0",
          {
            nsfw: false,
            parentID: ticketCategory,
            permissionOverwrites: perms,
          }
        );
        console.log(ticketChannel.permissionOverwrites);
        return message.channel
          .createMessage(`${message.author.mention}, I Opened a ticket called:
    ${ticketChannel.mention}`);
      }
    }
  },
};
