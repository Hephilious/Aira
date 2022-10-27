module.exports = {
  name: "play",
  run: async (client, message, args) => {
    let embed = {
      title: "Play command",
      description: "How to use play command",
      color: 0xff2b2b,
      fields: [
        {
          name: "Usage",
          value: "hello",
          inline: true,
        },
      ],
      author: {
        name: "Luminary",
        icon_url: "https://i.ibb.co/0KJ0fT3/Luminary.png",
      },
    };

    return message.channel.createMessage({ embed: embed });
  },
};
