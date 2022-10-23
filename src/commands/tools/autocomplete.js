const { SlashCommandBuilder } = require("discord.js");
const CountryData = require('../../app.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("autocomplete")
    .setDescription("returns automcplete")
    .addStringOption((option) =>
      option
        .setName("country")
        .setDescription(`Enter Your Country Name`)
        .setRequired(true)
    ),
  async autocomplete(interaction, client) {
    const focusedValue = interaction.options.getFocused();
    const choices = [];
    const filtered = choices.filter((choice) =>
      choice.startsWith(focusedValue)
    );
    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },
  async execute(interaction, client) {
    const option = interaction.options.getString(`country`);
    const choices = CountryData.Countries;
    let reply = null;
    for(const CountryChoice of choices)
    {
        // console.log(CountryChoice)
        if(option.toLowerCase() === CountryChoice.toLowerCase())
        {
            reply = `Your Country Choice Is ${CountryChoice}`
        }
    }
    if(reply === null)
    {
        reply = `Sorry, Your Country Choice Is Not A Valid Country`
    }
    await interaction.reply({ content: reply});
  },
};
