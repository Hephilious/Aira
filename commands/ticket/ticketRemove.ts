module.exports = {
  run: async (client, message, args, db) => {
    const { TextChannel } = require("eris");
    const guild = client.guilds.get(message.guildID);
    let user: String | null = null;
    if (args[0] == "remove") {
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
          0n,
          1024n,
          1,
          "Removed user from Ticket!"
        );
        return message.channel.createMessage(
          `${message.author.mention}, I removed <@${user}> from this channel!`
        );
      } else {
        return message.channel.createMessage(
          `${message.author.mention}, You can only use this command in a ticket channel!`
        );
      }
    }
  },
};
