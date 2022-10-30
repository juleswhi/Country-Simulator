const mongoose = require("mongoose");
const User = require("../../schemas/user");

module.exports = {
  data: {
    name: `inputInvestment`,
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: null,
    });
  },
  async run(interaction, client) {
    const invest = interaction.fields
      .getTextInputValue("investInput")
      .toLowerCase();

    const statementsChannel = client.channels.cache.find(
      (channel) => channel.name === "statements"
    );

    const user = await User.findOne({ userName: interaction.user.tag });
    
    statementsChannel.send(`${await user.Country} has invested in ${invest}`);
  },
};
