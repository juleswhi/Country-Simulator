const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const User = require("../../schemas/user");
const Guild = require("../../schemas/guild");
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

    const date = await Guild.findOne({ guildId: interaction.guild.id });
    const now = date.Year();

    console.log(
      `The Country Data Of ${interaction.user.tag} is: \n${CountryData}`
    );

    const Name = CountryData.Country;
    const InvestMoney = CountryData.Money.InvestMoney;
    const YearlyIncome = CountryData.Money.YearlyIncome;
    const SpecialResource = CountryData.SpecialResource;
    const ApprovalRating = CountryData.ApprovalRating;
    var Alliance = CountryData.Alliance;
    const Population = CountryData.Population;

    // for(const ally of alliances)
    // {
    //   for(const member of ally.Members)
    //   {
    //     if(member.Name === interaction.user.tag)
    //     {
    //       AllianceName = ally.Name;
    //     }
    //   }
    // }
    if (Alliance === null) Alliance = "None";

    //    console.log(interaction.user.tag)
    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.tag}'s Stats`)
      .setDescription(`These Are Your Contries Statistics`)
      .setColor(0x18e1ee)
      // .setURL()
      // .setImage()
      // .setThumbnail

      .setTimestamp(now); // Potentially create custom time scale, 1 day irl = 1 year

    embed.addFields([
      { name: `Country Name`, value: Name },
      {
        name: `Investment Money`,
        value: `${InvestMoney.toString()}B`,
        inline: true,
      },
      {
        name: `Yearly Income`,
        value: `${YearlyIncome.toString()}B`,
        inline: true,
      },
      {
        name: `Special Resource`,
        value: SpecialResource.toString(),
        inline: true,
      },
      {
        name: `Approval Rating`,
        value: ApprovalRating.toString(),
        inline: true,
      },
      { name: `Alliance`, value: Alliance.toString(), inline: true },
      { name: `Population`, value: Population.toString(), inline: true },
    ]);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
