const CountryData = require("../../app.js");
const User = require("../../schemas/user");
const Resources = require("../../app.js");
const mongoose = require("mongoose");

module.exports = {
  data: {
    name: `inputCountry`,
  },
  async execute(interaction, client) {
    await interaction.editReply({
      content: ``
    });
  },
  async run(interaction, client) {
    const resources = Resources.Resources;
    let hasCountry = false;
    let Country = null;
    const channel = client.channels.cache.find(
      (channel) => channel.name === "statements"
    );
    const choices = CountryData.Countries;
    for (const CountryChoice of choices) {
      if (
        interaction.fields.getTextInputValue("countryInput").toLowerCase() ===
        CountryChoice.toLowerCase()
      ) {
        channel.send(`Your Country of choice is, ${CountryChoice}`);
        Country = CountryChoice;
        hasCountry = true;
      }
    }
    if (!hasCountry)
      channel.send(
        `Your Country Was Not Recognised :(, \n type /countries to see all available countries`
      );

    let userProfile = await User.findOne({ userName: interaction.user.tag });
    if (!userProfile) {
      const propMoney = (Math.floor(Math.random() * 501) + 1).toString();
      userProfile = await new User({
        _id: mongoose.Types.ObjectId(),
        userName: interaction.user.tag,
        Country: Country,
        ApprovalRating: (Math.floor(Math.random() * 101) + 1).toString(),
        Resources: {
          InvestMoney: propMoney.toString(),
          YearlyIncome: (propMoney / 100).toString(),
          SpecialResource:
            resources[Math.floor(Math.random() * resources.length)],
          InvestedCompanies: [],
        },
      });

      await userProfile.save().catch(console.error);
      await interaction.reply({
        content: `${interaction.user.tag} Has been added to the database, with country ${Country}`,
      });
      console.log(userProfile);
    } else {
      await interaction.reply({
        content: `${interaction.user.tag} has already been added to the database`,
      });
      console.log(userProfile);
    }
  },
};
