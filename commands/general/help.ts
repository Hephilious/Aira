module.exports = {
  name: "help",
  description: "retrieve a list of commands or get usage on some commands",
  argsRequired: false,
  guildOnly: false,
  usage: "$help",
  alias: [],
  run: async (client, message, args, Manager) => {
    const fs = require("fs");
    let cmd_test = false;
    if (args[0]) {
      const load_dirs_helpEmeds = (dirs) => {
        const help_embed_files = fs
          .readdirSync(`./helpEmbeds/${dirs}/`)
          .filter((file) => file.endsWith(".js"));
        help_embed_files.forEach((file) => {
          const helpEmbed = require(`../../helpEmbeds/${dirs}/${file}`);
          if (args[0] == helpEmbed.name) {
            let argsEmbed;
            if (args[1]) {
              argsEmbed = args.slice(1);
            }
            cmd_test = true;
            return helpEmbed.run(client, message, argsEmbed);
          }
        });

        if (args[0] == dirs) {
          const help_embed_categories = fs
            .readdirSync(`./helpEmbeds/`)
            .filter((file) => file.endsWith(".ts"));
          let cmd_test = false;
          help_embed_categories.forEach((category) => {
            const help_embed_category = require(`../../helpEmbeds/${category}`);
            return help_embed_category.run(client, message);
            cmd_test = true;
          });
        }
      };
      ["music", "general"].forEach((e) => load_dirs_helpEmeds(e));
      if (!cmd_test)
        return message.channel.createMessage(
          `${message.author.mention} I don't seem to have a command called "${args[0]}"`
        );
    } else {
      let embed = {
        title: "Help",
        description: "Here's a list of commands",
        color: 0xf76233,
        fields: [
          {
            name: "Music",
            value: "Use `$help music` to show the commands for Music and Audio",
            inline: true,
          },
        ],
        author: {
          name: "Luminary",
          icon_url: "https://i.ibb.co/0KJ0fT3/Luminary.png",
        },
      };
      const user = await client.getDMChannel(message.author.id);
      client.createMessage(user.id, { embed: embed });
    }
  },
};
