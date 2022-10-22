module.exports = {
  data: {
    name: `selectCountry`,
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `you selected: ${interaction.values[0]}`,
    });
  },
};
