const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle} = require('discord.js')



module.exports = {
    data: new SlashCommandBuilder()
        .setName("claim")
        .setDescription('Input a country to claim'),
    async execute( interaction, client )
    {
        const modal = new ModalBuilder()
            .setCustomId(`inputCountry`)
            .setTitle(`Country Selector`);

        const textInput = new TextInputBuilder()
            .setCustomId("countryInput")
            .setLabel("Please Enter Your Chosen Country")
            .setRequired(true)
            .setStyle(TextInputStyle.Short);
            
            // add multitple text inputs here
        
        modal.addComponents(new ActionRowBuilder().addComponents(textInput));

        await interaction.showModal(modal)
    }
}
