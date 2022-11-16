import { CommandClient, Message, User } from "eris";
import Surreal from "surrealdb.js";

module.exports = async (
  Eris,
  bot: CommandClient,
  Manager,
  guildID,
  db: Surreal,
  message: Message
) => {
  let Username: string =
    message.author.username + "#" + message.author.discriminator;
  /*if (message.content == "nigger") {
    message.channel
      .createMessage(`${message.author.mention}, Racism isn't allowed!`)
      .then((msg) => {
        setTimeout(() => msg.delete(), 1800);
      });
    message.delete();
  }*/
  let id;
  let userID;
  try {
    id = await db.select(`insights:${bot.user.id}`);
    userID = await db.select(`users:${message.author.id}`);
    id = id[0];
    userID = userID[0];
  } catch (err) {
    if (err.name == "RecordError") {
      userID = await db.create(`users:${message.author.id}`, {
        name: Username,
        money: 0,
      });
      let users: Array<object> | number = await db.select("users");
      users = users.length;
      let updated = await db.change(`insights:${bot.user.id}`, {
        users: users,
      });
    } else {
      console.log(err);
    }
  } finally {
    if (userID.name) {
      console.log("Exists");
      console.log(`${id.users}`);
      console.log(userID);
    } else {
      console.log("Non Exist");
      let newUser = await db.update(`users:${message.author.id}`, {
        name: Username,
        money: 0,
      });
      console.log(newUser.name);
    }
  }
  let newInsights = await db.select(`insights:${bot.user.id}`);
  console.log(newInsights);
};
