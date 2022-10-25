const Eris = require("eris");
const Eralajs = require("erela.js");

module.exports = {
  name: "help",
  description: "retrieve a list of commands or get usage on some commands",
  argsRequired: false,
  guildOnly: false,
  usage: "-hi",
  alias: [],
  run: async (client, message, args, Manager) => {
    if (args[0]) {
      const load_dirs_helpEmeds = (dirs) => {
        const help_embed_files = fs
          .readdirSync(`./helpEmbeds/${dirs}/`)
          .filter((file) => file.endsWith(".js"));
        help_embed_files.forEach((file) => {
          const helpEmbed = require(`../../helpEmbeds/${file}`);
          if (args[0] == helpEmbed.name) {
            const argsEmbed = args.slice(1);
            return helpEmbed.run(client, message, argsEmbed);
          }
        });
        return client.createMessage(
          `${message.author.mention}, That is not a valid command!`
        );
      };
      ["music", "general"].forEach((e) => load_dirs_helpEmeds(e));
    } else {
      console.log("helllo");
    }
  },
};
