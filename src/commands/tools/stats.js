const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const User = require("../../schemas/user");
const fs = require("fs");
const mongoose = require("mongoose");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Returns the users stats"),
  async execute(interaction, client) {
    const CountryData = await User.findOne({
      userName: interaction.user.tag,
    });

    console.log(
      `The Country Data Of ${interaction.user.tag} is: \n${CountryData}`
    );

    const Name = CountryData.Country;
    const InvestMoney = CountryData.Money.InvestMoney;
    const YearlyIncome = CountryData.Money.YearlyIncome;
    const SpecialResource = CountryData.SpecialResource;
    const ApprovalRating = CountryData.ApprovalRating;
    const Alliance = CountryData.Alliance;
    if(Alliance === null) Alliance = "None";
    const Population = CountryData.Population;

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
      { name: `Country Name`, value: Name },
      {
        name: `Investment Money`,
        value: InvestMoney.toString(),
        inline: true,
      },
      {
        name: `Yearly Income`,
        value: YearlyIncome.toString(),
        inline: true,
      },
      {
        name: `Special Resource`,
        value: SpecialResource.toString(),
      },
      { name: `Approval Rating`, value: ApprovalRating.toString() },
      { name: `Alliance`, value: Alliance.toString() },
      { name: `Population`, value: Population.toString() },
    ]);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
