module.exports = {
    data: {
        name: `inputCountry`
    },
    async execute(interaction, client)
    {
        await interaction.reply({
            content: `The Country You Selected is: ${interaction.fields.getTextInputValue("countryInput")}`
        });
        
    }
}