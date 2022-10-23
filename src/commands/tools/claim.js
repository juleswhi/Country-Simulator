const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle} = require('discord.js')
const CountryData = require('../../app.js');



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
        
        // const textInput1 = new TextInputBuilder()
        //     .setCustomId("investInput")
        //     .setLabel("Enter a country to invest")
        //     .setRequired(false)
        //     .setStyle(TextInputStyle.Short);

        
            
            
        
        modal.addComponents(new ActionRowBuilder().addComponents(textInput));

        await interaction.showModal(modal)
    }
}
