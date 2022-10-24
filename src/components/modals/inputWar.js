const mongoose = require("mongoose");
const CountryData = require("../../app.js");
const User = require("../../schemas/user");

module.exports = {
  data: {
    name: `inputWar`,
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `Going To War`,
    });
  },
  async run(interaction, client) {
    const choices = CountryData.Countries;
    for (const CountryChoice of choices) {
      if (
        CountryChoice.toLowerCase() ===
        interaction.fields.getTextInputValue("warInput").toLowerCase()
      ) {
        console.log(`Going to war with ${CountryChoice}`);
      }
    }
  },
};
