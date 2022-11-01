const { ChannelType, PermissionFlagsBits } = require("discord.js");
const User = require("../../schemas/user");
const mongoose = require("mongoose");

module.exports = {
  data: {
    name: `inputStatement`,
  },
  async execute(interaction, client) {
    try {
      await interaction.reply({});
    } catch (err) {}
  },
  async run(interaction, client) {
    const paragraph = interaction.fields
      .getTextInputValue("statementInput")

    const user = await User.findOne({
      userName: interaction.user.tag,
    });
    const cat = await client.channels.cache.find(
      (channel) => channel.name === `${user.Country}`
    );
    // console.log(cat)
    const statementsChannel = await client.channels.cache.find(
      (channel) =>
        channel.parentId === cat.id
        && channel.type === ChannelType.GuildText
    );

    const channel = await client.channels.cache.find(
      (channel) => channel.name === `statements`
    );
    // console.log(`Statement Channel is: ${statementsChannel}`)

    console.log(`Substring = ${paragraph.substring(0,6)}`)
    // console.log(`Statemtn Channel Object \n\n\n\n ${statementsChannel} \n\n\n\n`)
    if (paragraph.substring(0,6) === "$GLOBAL") {
      channel.send(`@everyone ${user.userName} Has Made An Announcement On Behalf Of ${user.Country}\n
        \"${paragraph.substring(6, paragraph.length)}\"`);
    } else {
      console.log(`${user.userName} has sent a statement to thier local chat`)
      statementsChannel.send(paragraph);
    }
  },
};
// $GLOBAL
