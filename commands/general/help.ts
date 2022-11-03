import { Manager } from "erela.js";
import { CommandClient, ComponentInteraction, Message, User } from "eris";
import { Paginator } from "../../LumDux/Paginator";
let user: User;
let deleteMessage: boolean = false;
let embeds: Array<object> = [
  {
    title: "Category Change",
    author: {
      name: "Luminary",
      icon_url: "https://i.postimg.cc/gJc4pZb3/Luminary.png",
    },
    color: 0xf76233,
    fields: [
      {
        name: "$play <url || search> | Music",
        value:
          "plays a song of your choice by using a youtube url of your choice or a youtube search as an argument" +
          "Use `$play help` to get more info on the command.",
      },
      {
        name: "",
      },
    ],
  },
  {
    title: "test2",
    description: "hello2",
  },
  {
    title: "test3",
    description: "hello3",
  },
];
let helpPaginator = new Paginator(
  3,
  embeds,
  "prev_embed_help",
  "next_embed_help"
);

module.exports = {
  name: "help",
  description: "retrieve a list of commands or get usage on some commands",
  argsRequired: false,
  guildOnly: true,
  usage: "$help",
  alias: [],
  run: async (
    client: CommandClient,
    message: Message,
    args,
    Manager: Manager
  ) => {
    user = message.author;
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
      let embeds: Array<Object> = [];
      for (let i = 0; i < 4; i++) {
        embeds.push({
          description: "hello",
        });
      }

      const user = await client.getDMChannel(message.author.id);
      message.channel.createMessage(
        helpPaginator.getRow(helpPaginator.currentPage.toString())
      );
    }
  },
  button_ids: [
    {
      name: "next_embed_help",
      run: async (Interaction: ComponentInteraction) => {
        helpPaginator.currentPage++;
        const id = Interaction.member.id;
        helpPaginator.pages[id] = helpPaginator.pages[id] || 0;

        const embed: Object = helpPaginator.embeds[helpPaginator.pages[id]];

        let filter = (i: ComponentInteraction) => i.member.id === user.id;
        await Interaction.acknowledge();
        if (deleteMessage) {
          Interaction.deleteOriginalMessage();
        } else {
          deleteMessage = true;
        }
        if (filter(Interaction)) {
          Interaction.createFollowup(
            helpPaginator.getRow(helpPaginator.currentPage.toString())
          );
        }
      },
    },
    {
      name: "prev_embed_help",
      run: async (Interaction: ComponentInteraction) => {
        helpPaginator.currentPage--;
        const id = Interaction.member.id;
        helpPaginator.pages[id] = helpPaginator.pages[id] || 0;

        const embed: Object = helpPaginator.embeds[helpPaginator.pages[id]];
        await Interaction.acknowledge();
        if (deleteMessage) {
          Interaction.deleteOriginalMessage();
        } else {
          deleteMessage = true;
        }
        let filter = (i: ComponentInteraction) => i.member.id === user.id;
        if (filter(Interaction)) {
          Interaction.createFollowup(
            helpPaginator.getRow(helpPaginator.currentPage.toString())
          );
        }
      },
    },
  ],
};
