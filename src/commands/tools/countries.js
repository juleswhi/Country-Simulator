const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("countries")
    .setDescription("returns all countries"),
  async execute(interaction, client) {
      try {
        await interaction.reply();
      } catch (error) {}
    const countries = await fs.readFileSync("./src/CountryData/countries.json");
    const countriesJSON = await JSON.parse(countries);
    console.log(countriesJSON);
    try {
      
      interaction.user.send({
        content: `test`
      })
    } catch (error) {console.log(chalk.red(`There Was An Error Sending Message To User: \nUser Does Not Allow DM's`))}

  },
};
