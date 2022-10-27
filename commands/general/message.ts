module.exports = {
  name: "message",
  description: "the bot will dm a user of you choice",
  argsRequired: true,
  guildOnly: false,
  usage: "$hi",
  invalidUsageMessage:
    "Use $help message command to get an embed of the command usage",
  alias: [],
  run: async (client, message, args, Manager) => {
    const userID = args[0];
    let userChannel;
    try {
      userChannel = await client.getDMChannel(userID);
    } catch (err) {
      return message.channel.createMessage("Invalid user id!");
    }
    userChannel = await client.getDMChannel(userID);
    client.createMessage(
      userChannel.id,
      args[1] +
        ` \`from ${message.author.username}#${message.author.discriminator}\``
    );
    return message.channel.createMessage(
      message.author.mention + ", The message has been sent!"
    );
  },
};
