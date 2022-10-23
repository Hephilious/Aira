const {
  CommandClient,
  Interaction,
  DiscordHTTPError,
  Collection,
} = require("eris");
const Eris = require("eris");
const { readdirSync } = require("fs");
const { fileURLToPath } = require("url");
const Eralajs = require("erela.js");
const fs = require("fs");
require("dotenv").config();

const guildID = "907099087101370418";
const Manager = new Eralajs.Manager({
  nodes: [
    {
      host: "localhost",
      port: 5239,
      password: process.env.ERALA_PASSWORD,
    },
  ],
  send(id, payload) {
    const guild = bot.guilds.get(id);
    if (guild) {
      guild.shard.sendWS(payload.op, payload.d);
    }
  },
});

let bot = new CommandClient(
  process.env.DISCORD_TOKEN,
  {
    getAllUsers: true,
    intents: [
      "guildPresences",
      "guildMembers",
      "guilds",
      "guildMessages",
      "guildVoiceStates",
    ],
  },
  {
    prefix: "-",
  }
);

/* bot.on("ready", async () => {
  let discriminator = bot.user.discriminator;
  let botname = bot.user.username;
  Manager.init(bot.user.id);
  console.log(`Bot ${botname}#${discriminator} has logged on`);
  bot.editStatus("dnd", { name: "Hephilious", type: 3 });
  try {
    bot.createGuildCommand(guildID, {
      name: "ping",
      type: Eris.Constants.ApplicationCommandOptionTypes.CHAT_INPUT,
      description: "pong",
    });
  } catch (err) {
    console.log(err);
  }
}); */

Manager.on("nodeConnect", (node) => {
  console.log(`Connected to: ${node.options.identifier}`);
});

Manager.on("trackStart", (player, track) => {
  bot.createMessage(player.textChannel, {
    embed: {
      title: "Now Playing",
      description: `Playing:[${track.title}](${track.uri})`,
    },
  });
});

/* bot.on("interactionCreate", (Interaction) => {
  if (Interaction instanceof Eris.CommandInteraction) {
    if (Interaction.data.name == "ping") {
      return Interaction.createMessage("Pong!");
    }
  }
}); */

/* bot.on("messageCreate", async (message) => {
  if (message.author.bot || !message.channel.guild) return;
  console.log(message.author + " said: " + message.content);
}); */
["event_handler"].forEach((handler) => {
  require(`./handlers/${handler}`)(bot, Eris, Manager, guildID, Eralajs);
});
const command_files = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));
command_files.forEach((file) => {
  const command = require(`./commands/${file}`);
  bot.registerCommand(
    command.name,
    async (message, args) => command.run(bot, message, args, Manager),
    {
      aliases: command.alias,
      description: command.description,
    }
  );
});
bot.on("rawWS", (d) => Manager.updateVoiceState(d));
bot.connect();
