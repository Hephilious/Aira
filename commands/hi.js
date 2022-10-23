const Eris = require("eris");
const Eralajs = require("erela.js");

module.exports = {
  name: "hi",
  description: "testing command",
  alias: [],
  run: async (client, message, args, Manager) => {
    if (message.channel instanceof Eris.Channel) {
      client.createMessage(message.channel.id, "hello");
    } else {
      console.log(message);
    }
  },
};
