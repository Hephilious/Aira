module.exports = (Eris, bot, Manager, guildID, message) => {
  if (message.content == "nigger") {
    message.channel
      .createMessage(`${message.author.mention}, Racism isn't allowed!`)
      .then((msg) => {
        setTimeout(() => msg.delete(), 1800);
      });
    message.delete();
  }
};
