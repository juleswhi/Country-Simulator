const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dissolve')
        .setDescription('Dissolve an alliance!'),
    async execute( interaction, client )
    {
     
        const modal = new ModalBuilder()
            .setCustomId(`inputDissolve`)
            .setTitle(`Dissolve Selector`);

        const textInput = new TextInputBuilder()
            .setCustomId("dissolveInput")
            .setLabel("Enter Country To Form Alliance")
            .setRequired(true)
            .setStyle(TextInputStyle.Short);

            modal.addComponents(new ActionRowBuilder().addComponents(textInput));

            await interaction.showModal(modal);
        
    }
}