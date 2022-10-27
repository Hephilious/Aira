module.exports = {
  name: "clear",
  run: async (client, message, args) => {
    let embed = {
      title: "Play Command",
      description: "this is description",
    };
    return message.channel.createMessage({ embed: embed });
  },
};
