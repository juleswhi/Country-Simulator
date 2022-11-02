const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const User = require("../../schemas/user");
const fs = require("fs");
const mongoose = require("mongoose");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Returns the users stats"),
  async execute(interaction, client) {
    const CountryData = await User.find({
      userName: interaction.user.tag,
    });

    console.log(`The Country Data Of ${interaction.user.tag} is: \n${CountryData}`);

    //    console.log(interaction.user.tag)
    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.tag}'s Stats`)
      .setDescription(`These Are Your Contries Statistics`)
      .setColor(0x18e1ee)
      // .setURL()
      // .setImage()
      // .setThumbnail

      .setTimestamp(Date.now()); // Potentially create custom time scale, 1 day irl = 1 year

    embed.addFields([
      { name: `Country Name`, value: CountryData[0].Country },
      {
        name: `Investment Money`,
        value: CountryData[0].Resources.InvestMoney,
        inline: true,
      },
      {
        name: `Yearly Income`,
        value: CountryData[0].Resources.YearlyIncome,
        inline: true,
      },
      {
        name: `Special Resource`,
        value: CountryData[0].Resources.SpecialResource,
      },
      { name: `Approval Rating`, value: CountryData[0].ApprovalRating },
    ]);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
