import { CommandClient, CommandInteraction } from "eris";

module.exports = {
  name: "ping",
  description: "pong",
  options: [
    {
      name: "test",
      description: "Test Parameter Option",
      type: 3,
      required: false,
    },
  ],
  run: async (
    client: CommandClient,
    interaction: CommandInteraction,
    args,
    Manager
  ) => {
    const [test] = args;
    console.log(test);
    //return interaction.createMessage(`Testing ${test.value}`);
    return interaction.createMessage(`Pong! ${test.value}`);
  },
};
