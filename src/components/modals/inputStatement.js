const mongoose = require("mongoose");

module.exports = {
  data: {
    name: `inputStatement`,
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: null,
    });
  },
  async run(interaction, client) {
    const paragraph = interaction.fields.getTextInputValue("statementInput").toLowerCase();

    const statementsChannel = client.channels.cache.find(
      (channel) => channel.name === "statements"
    );

    statementsChannel.send(paragraph);

    
  },
};
