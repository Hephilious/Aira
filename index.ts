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
const Surreal = require("surrealdb.js").default;
require("dotenv").config();

const guildID = "907099087101370418";

//to start surrealDB
//surreal start --log trace --user root --pass root file://surrealDB/Server
const db: typeof Surreal = new Surreal("http://0.0.0.0:8000/rpc");

async function main() {
  try {
    await db.connect("http://0.0.0.0:8000/rpc");
    await db.signin({
      user: "root",
      pass: "root",
    });
    let token = db.token;
    let connected = await db.query("INFO FOR KV;");
    await db.wait();
    console.log(connected);
    await db.use("BackPackBot", "BackPackDataBase");

    await db.query("DEFINE TABLE users SCHEMAFULL;");
    await db.query("DEFINE TABLE guilds SCHEMAFULL;");
    await db.query("DEFINE TABLE insights SCHEMAFULL;");

    await db.query("DEFINE FIELD guilds ON TABLE insights TYPE float;");
    await db.query("DEFINE FIELD users ON TABLE insights TYPE float;");

    await db.query("DEFINE FIELD name ON TABLE users TYPE string;");
    await db.query("DEFINE FIELD money ON TABLE users TYPE float;");

    await db.query("DEFINE FIELD moderation ON TABLE guilds TYPE object;");
    await db.query(
      "DEFINE FIELD moderation.admins ON TABLE guilds TYPE array;"
    );
    await db.query("DEFINE FIELD moderation.mods ON TABLE guilds TYPE array;");

    await db.query("DEFINE FIELD categories ON TABLE guilds TYPE object;");
    await db.query(
      "DEFINE FIELD categories.ticket ON TABLE guilds TYPE string;"
    );
    await db.query("DEFINE FIELD categories.info ON TABLE guilds TYPE string;");
    await db.query("DEFINE FIELD categories.main ON TABLE guilds TYPE string;");
    await db.query("DEFINE FIELD channels ON TABLE guilds TYPE object;");
    await db.query("DEFINE FIELD channels.music ON TABLE guilds TYPE string;");
    await db.query("DEFINE FIELD channels.rules ON TABLE guilds TYPE string;");
    await db.query("DEFINE FIELD channels.bot ON TABLE guilds TYPE string;");
  } catch (err) {
    console.log(`ERROR ${err}`);
  }
}

main();
const Manager = new Eralajs.Manager({
  nodes: [
    {
      host: "localhost",
      port: 4863,
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
    prefix: "$",
    owner: "Luminary",
    defaultHelpCommand: false,
  }
);

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

["event_handler", "command_handler"].forEach((handler) => {
  require(`./handlers/${handler}.ts`)(bot, Eris, Manager, guildID, db);
});

bot.on("rawWS", (d) => Manager.updateVoiceState(d));
bot.connect();
console.log(bot.shards);
