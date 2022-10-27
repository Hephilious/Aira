module.exports = {
  name: "clear",
  description: "deletes an ammount of messages of your choosing",
  argsRequired: true,
  guildOnly: true,
  usage: "$clear <ammount>",
  invalidUsageMessage:
    "Use $help clear command to get an embed of the command usage",
  alias: [],
  run: async (client, message, args, Manager) => {
    let self = message.channel.permissionsOf(client.user.id).json;
    let initiator = message.member.permissions.json;
    if (!self.manageMessages) {
      return message.channel.createMessage(
        `${message.author.mention}, I don't have the right permissions!`
      );
    }
    if (!initiator.manageMessages) {
      return message.channel.createMessage(
        `${message.author.mention}, You don't have the right permissions!`
      );
    }
    let number = args[0];
    if (isNaN(number)) {
      return message.channel.createMessage(
        `${message.author.mention}, ${number} isn't a number!`
      );
    }

    number = parseInt(number);
    if (!number || number < 1) {
      return message.channel.createMessage(
        `${message.author.mention}, ${number} is either too low or is nothing!`
      );
    }

    if (number > 100) {
      return message.channel.createMessage(
        `${message.author.mention}, ${number} is too high!`
      );
    }

    await message.delete();

    return message.channel
      .purge({ limit: number })
      .then((ammount) => {
        if (number == 1) {
          return message.channel.createMessage(
            `${message.author.mention}, ${number} message has been deleted`
          );
        } else {
          return message.channel.createMessage(
            `${message.author.mention}, ${number} messages have been deleted`
          );
        }
      })
      .catch((err) => {
        console.log(err);
        return message.channel.createMessage(
          `${message.author.mention}, an error has occured!`
        );
      });
  },
};
