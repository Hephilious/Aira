module.exports = {
  run: async (client, message, args, db) => {
    const { Member, TextChannel } = require("eris");
    const guild = client.guilds.get(message.guildID);
    let user: String | null = null;
    if (args[0] == "add") {
      if (args[1]) {
        guild.members.forEach((element) => {
          if (element.id == args[1]) {
            user = args[1];
            return user;
          }
          if (args[1] == `<@${element.id}>`) {
            user = args[1].slice(2).slice(0, -1);
            return user;
          }
        });
        if (!user) {
          return message.channel.createMessage(
            `${message.author.mention}, Please provide a valid Mention or UserID!`
          );
        }
        const ticketChannel: typeof TextChannel = message.channel;
        if (ticketChannel.name.includes("ticket-")) {
          await ticketChannel.editPermission(
            user,
            52288n,
            0n,
            1,
            "Added user to Ticket!"
          );
          return message.channel.createMessage(
            `${message.author.mention}, I added <@${user}> to this channel!`
          );
        } else {
          return message.channel.createMessage(
            `${message.author.mention}, You can only use this command in a ticket channel!`
          );
        }
      } else {
        message.channel.createMessage(
          `${message.author.mention}, Please provide a User to Add!`
        );
      }
    }
  },
};
