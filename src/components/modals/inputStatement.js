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
      .toLowerCase();

    const statementsChannel = client.channels.cache.find(
      (channel) => channel.name === "statements"
    );

    const guild = await client.guilds.cache.get("1032948591112765510");
    console.log(`Gotten Guild`);
    statementsChannel.send(paragraph);

    const user = await User.findOne({
      userName: interaction.user.tag,
    });
    // if (
    //   client.channels.cache.find(
    //     (channel) =>
    //       channel.type === ChannelType.GuildCategory &&
    //       channel.name === `${user.Country}`
    //   )
    // ) {
    //   return;
    // }
    guild.channels.create({
      name: `${user.Country}`,
      type: ChannelType.GuildCategory,
    });

    let pointer = await guild.channels.create({
      name: `Test`,
      type: ChannelType.GuildText,
    });
    pointer = String(pointer);
    console.log(`Searching`);
    let category = guild.channels.cache.find(
      (ch) => ch.name === `${user.Country}`
    );
    console.log(`Category ID: ${category.id}`);
    console.log(
      `Channel ID: ${await pointer.substring(2, 21)}`
    );
    let channel = await guild.channels.cache.find(ca => ca.id === pointer.substring(2, 21));
    if(category && channel) channel.setParent(category.id);
    else console.error(`Missing Category Or Channel \nCategory: ${!!category} \nChannel: ${!!channel}`);
    // channel.setParent(category.id)

    // console.log("a")
    // console.log(category)
    // pointer.setParent()
  },
};
