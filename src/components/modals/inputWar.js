const mongoose = require("mongoose");
const CountryData = require("../../app.js");
const User = require("../../schemas/user");
const War = require("../../schemas/war");
const Alliance = require("../../schemas/alliance");

module.exports = {
  data: {
    name: `inputWar`,
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

    const allWarData = await War.find();

    for (const CountryChoice of choices) {
      if (
        CountryChoice.toLowerCase() ===
          interaction.fields.getTextInputValue("warInput").toLowerCase() &&
        userData != null
      ) {
        for (const users of allUserData) {
          if (users.Country === CountryChoice) {
            for (const war of allWarData) {
              if (
                war.CountryB === users.userName &&
                war.CountryA === interaction.user.tag
              ) {
                console.log(`You are already at war with ${users.userName}!`);
                return;
              }
            }
            for (const alliance of allAllianceData) {
              if (
                alliance.CountryA === interaction.user.tag &&
                alliance.CountryB === users.userName
              ) {
                console.log(
                  `Already allianced with, please dissolve alliance first ${users.userName}`
                );
                return;
              }
            }

            const war = {
              _id: mongoose.Types.ObjectId(),
              CountryA: interaction.user.tag,
              CountryB: users.userName,
            };

            const result = await War.create(war);
            console.log(
              `${result.CountryA} has declared war on ${result.CountryB}`
            );
            const statementsChannel = client.channels.cache.find(
              (channel) => channel.name === "statements"
            );
            statementsChannel.send(
              `${result.CountryA} has declared war on ${result.CountryB}`
            );
          }
        }
      }
    }
  },
};
