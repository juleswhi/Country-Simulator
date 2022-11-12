const mongoose = require("mongoose");
const CountryData = require("../../app.js");
const User = require("../../schemas/user");
const Alliance = require("../../schemas/alliance");
const War = require("../../schemas/war");
const inpC = require("../../components/modals/inputCountry");

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
    console.log(
      `Joining Allinace with country ${interaction.fields
        .getTextInputValue("joinAllianceInput")
        .toLowerCase()}`
    );

    const alliances = await Alliance.find();
    const user = await User.findOne({ userName: interaction.user.tag });
    const input = interaction.fields
      .getTextInputValue("joinAllianceInput")
      .toLowerCase();
    console.log(`Testing For Users`);
    if (!user) {
      await interaction.reply({
        content: `Please claim a country before joining an alliance`,
      });
      console.log(`User Does Not Have An Alliance ${interaction.user.tag}`);
      return;
    }
    if (user.Alliance != null) {
      await interaction.reply({ content: `You are already in a alliance!` });
      console.log(`User is already in an alliance`);
      return;
    }
    if (user.Money.InvestMoney < 20) {
      console.log(`Not enough money`);
      await interaction.reply(
        `Not Enough Money To Join Alliance :( You Must Have More Than 20B`
      );
      return;
    }
    console.log(`All Alliances: ${alliances}`);
    for (const alliance of alliances) {
      console.log(
        `Input: ${input} and Alliance Name: ${alliance.Name.toLowerCase()}`
      );
      if (input === alliance.Name.toLowerCase()) {
        console.log(`Alliance Name Valid ${alliance.Nane}`);

        var allianceProfile = await Alliance.findOne({ Name: alliance.Name });

        if (allianceProfile.Members.length > 3) {
          console.log(`Alliance Too Big`);
          await interaction.reply({
            content: `There Are Too Many People In That Alliance ${alliance.Name}`,
          });
          return;
        }

        const allianceNewMember = {
          Name: interaction.user.tag,
          MoneyContributed: allianceProfile.JoinFee,
        };
        allianceProfile.Members.push(allianceNewMember);
        console.log(
          `Alliance: ${allianceProfile.Name}'s Members Are: ${allianceProfile.Members}`
        );
        await allianceProfile.save();
        const investMoney = user.Money.InvestMoney;
        user.Money.InvestMoney = investMoney - 20;
        user.Alliance = alliance.Name;
        await user.save();
        await interaction.reply({
          content: `Joined Alliance ${alliance.Name}`,
        });


        const pointer = inpC.statementChannel;
        pointer.send(`Test`)

        // const userPro = await User.findOne({ userName: interaction.user.tag });
        // const cat = await client.channels.cache.find(
        //   (cat) => cat.name === `${userPro.Country}`
        // );
        // var catId = String(cat.id);
        // catId = catId.substring(1, catId.length - 1);
        // console.log(`catId: ${catId}`)
        // const channel = await client.channels.cache.find(
        //   (channel) => channel.name === `general`
        // );
        // console.log(`Channel Data ${await channel}`);
        // channel.send("Boobs");
      }
    }
  },
};
