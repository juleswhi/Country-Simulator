const mongoose = require("mongoose");
const CountryData = require("../../app.js");
const User = require("../../schemas/user");
const Alliance = require("../../schemas/alliance");
const War = require("../../schemas/war");
const Request = require("../../schemas/request")
const Guild = require("../../schemas/guild")
const inpC = require("../../components/modals/inputCountry");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
  data: {
    name: `joinAlliance`,
  },
  async execute(interaction, client) {
    // try {
    //   await interaction.reply({});
    // } catch (err) {}
  },
  async run(interaction, client) {
  

    const alliances = await Alliance.find();
    const user = await User.findOne({ userName: interaction.user.tag });
    const input = interaction.fields
      .getTextInputValue("joinAllianceInput")
      .toLowerCase();
    if (!user) {
      await interaction.reply({
        content: `Please claim a country before joining an alliance`,
      });
      return;
    }
    if (user.Alliance != null) {
      await interaction.reply({ content: `You are already in a alliance!` });
      return;
    }
    if (user.Money.InvestMoney < 20) {
      await interaction.reply(
        `Not Enough Money To Join Alliance :( You Must Have More Than 20B`
      );
      return;
    }
    for (const alliance of alliances) {
     
      if (input === alliance.Name.toLowerCase()) {

        var allianceProfile = await Alliance.findOne({ Name: alliance.Name });

        if (allianceProfile.Members.length > 3) {
          console.log(`Alliance Too Big`);
          await interaction.deferReply({
            content: `There Are Too Many People In That Alliance ${alliance.Name}`,
          });
          return;
        }
        const guild = await Guild.findOne({ guildId: interaction.guild.id });
        const RequestProfile = await new Request({
          _id: `${interaction.user.tag}${alliance.Name}${Math.floor(Math.random() * 5332321)}`,
          requestingUser: interaction.user.tag,
          requestingAlliance: alliance.Name,
          Date: guild.Year
        });
        await RequestProfile.save();
        var incomingUser;
        for(const member of alliance.Members)
        {
          if(member.Chairman === true){
            incomingUser = await User.findOne({ userName: member.Name})
          }
        }
        console.log(`${incomingUser.Country}`)
        const fixedCountryname = incomingUser.Country.replace(' ', '-');
        console.log(`Fixed Name: ${fixedCountryname}`)
        const channel = await client.channels.cache.find(
          (channel) => channel.name === `${fixedCountryname.toLowerCase()}-statements`
        );
        console.log(channel)
        const button = new ButtonBuilder()
          .setCustomId(`AcceptAllianceRequest`)
          .setLabel(`Accept ${interaction.user.tag} Into ${alliance.Name}`)
          .setStyle(ButtonStyle.Primary);
        await channel.send({
          components: [new ActionRowBuilder().addComponents(button)],
        });
        await interaction.reply({
          content: `You Have Sent Your Request`,
          ephemeral: true
        })




        // const allianceNewMember = {
        //   Name: interaction.user.tag,
        //   MoneyContributed: allianceProfile.JoinFee,
        //   Chairman: false,
        // };
        // allianceProfile.Members.push(allianceNewMember);
        
        // await allianceProfile.save();
        // const investMoney = user.Money.InvestMoney;
        // user.Money.InvestMoney = investMoney - 20;
        // user.Alliance = alliance.Name;
        // await user.save();





        // await interaction.reply({
        //   content: `Joined Alliance ${alliance.Name}`,
        // });

        // const pointer = inpC.statementChannel;
        // pointer.send(`Test`)

        
      }
    }
  },
};
