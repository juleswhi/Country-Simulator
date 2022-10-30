const mongoose = require("mongoose");
const CountryData = require("../../app.js");
const User = require("../../schemas/user");
const Alliance = require("../../schemas/alliance");
const War = require("../../schemas/war");
const { UserFlags } = require("discord.js");

module.exports = {
  data: {
    name: `inputDissolve`,
  },
  async execute(interaction, client) {
    try {
      await interaction.reply({});
    } catch (err) {}
  },
  async run(interaction, client) {
    const choices = CountryData.Countries;

    const userData = await User.findOne({ name: interaction.user.tag });

    const allUserData = await User.find();

    const allAllianceData = await Alliance.find();

    const statementsChannel = client.channels.cache.find(
        (channel) => channel.name === "statements"
    );

    const dissolveCountry =
      interaction.fields.getTextInputValue("dissolveInput");
    for (const alliance of allAllianceData) {
      for (const user of allUserData) {
        if (user.Country === dissolveCountry) {
          if (
            alliance.CountryB === user.userName &&
            alliance.CountryA === interaction.user.tag
          ) {
            console.log(
              `Removing Alliance ${alliance.CountryA} and ${alliance.CountryB}`
            );
            await Alliance.deleteOne({
              CountryA: interaction.user.tag,
              CountryB: user.userName,
            });
            console.log(`Removed`);
            const a = await Alliance.findOne({ CountryA: user.userName, CountryB: interaction.user.tag })
            if(a === null)
            {
                console.log(`Alliance with ${user.userName} and ${interaction.user.tag} Dissolved`)
                statementsChannel.send(`Alliance between ${interaction.user.tag} and ${user.userName} has been dissolved.`)
            }
          }
          
          
        }
      }
    }
  },
};
