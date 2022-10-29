var _a = require("eris"), CommandClient = _a.CommandClient, Interaction = _a.Interaction, DiscordHTTPError = _a.DiscordHTTPError, Collection = _a.Collection;
var Eris = require("eris");
var readdirSync = require("fs").readdirSync;
var fileURLToPath = require("url").fileURLToPath;
var Eralajs = require("erela.js");
var fs = require("fs");
var Surreal = require("surrealdb.js").default;
require("dotenv").config();
var guildID = "907099087101370418";
var db = new Surreal("http://0.0.0.0:8000/rpc");
var data;
async;
function main() {
    try {
        console.log("started DB connection");
        await;
        db.signin({
            user: "root",
            pass: "root",
        });
        var connected = await, db_1, query = ("INFO FOR KV;");
        console.log("connected to " + connected);
        await;
        db_1.wait();
        await;
        db_1.use("BackPackBot", "BackPackDataBase");
    }
    catch (err) {
        console.log("ERROR " + err);
    }
}
main();
var Manager = new Eralajs.Manager({
    nodes: [
        {
            host: "localhost",
            port: 4863,
            password: process.env.ERALA_PASSWORD,
        },
    ],
    send: function (id, payload) {
        var guild = bot.guilds.get(id);
        if (guild) {
            guild.shard.sendWS(payload.op, payload.d);
        }
    },
});
var bot = new CommandClient(process.env.DISCORD_TOKEN, {
    getAllUsers: true,
    intents: [
        "guildPresences",
        "guildMembers",
        "guilds",
        "guildMessages",
        "guildVoiceStates",
    ],
}, {
    prefix: "$",
    owner: "Luminary",
    defaultHelpCommand: false,
});
Manager.on("nodeConnect", function (node) {
    console.log("Connected to: " + node.options.identifier);
});
Manager.on("trackStart", function (player, track) {
    bot.createMessage(player.textChannel, {
        embed: {
            title: "Now Playing",
            description: "Playing:[" + track.title + "](" + track.uri + ")",
        },
    });
});
["event_handler", "command_handler"].forEach(function (handler) {
    require("./handlers/" + handler + ".ts")(bot, Eris, Manager, guildID, db);
});
bot.on("rawWS", function (d) { return Manager.updateVoiceState(d); });
bot.connect();
//# sourceMappingURL=index.js.map