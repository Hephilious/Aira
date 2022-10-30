module.exports = {
  run: async (client, message, args, db) => {
    const guild = client.guilds.get(message.guildID);

    if (args[0] == "close") {
      if (
        message.channel.name == `ticket-${message.author.id}` ||
        message.author.id == guild.ownerID ||
        message.author.permissions.has(8n)
      ) {
        if (message.channel.name.includes("ticket-")) {
          let dmChannel = await client.getDMChannel(message.author.id);
          const ticketChannelUserID = message.channel.name.split("ticket-");
          const dmTicketMakerChannel = await client.getDMChannel(
            ticketChannelUserID[1]
          );
          if (dmTicketMakerChannel.id == dmChannel.id) {
            dmChannel.createMessage(
              `${message.channel.name} has been deleted!`
            );
          } else {
            dmChannel.createMessage(
              `${message.channel.name} has been deleted!`
            );
            dmTicketMakerChannel.createMessage(
              `${message.channel.name} has been deleted!`
            );
          }
          return message.channel.delete("Ticket was closed");
        } else {
          return message.channel.createMessage(
            `${message.author.mention},  This isn't a ticket channel!`
          );
        }
      } else {
        return message.channel.createMessage(
          `${message.author.mention},  This isn't a ticket channel or you're not the owner of it!`
        );
      }
    }
  },
};
