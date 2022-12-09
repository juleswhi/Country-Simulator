const mongoose = require("mongoose");
const User = require("../../schemas/user");
const Company = require("../../schemas/company")


module.exports = {
  data: {
    name: `inputCost`,
  },
  async execute(interaction, client) {},
  async run(interaction, client) {
    const money = interaction.fields
      .getTextInputValue("investInput")
      .toLowerCase();

    console.log(money)

  
  },
};
