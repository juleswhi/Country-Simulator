const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invest')
        .setDescription('Invest In Something!'),
    async execute(interaction, client) {

        const modal = new ModalBuilder()
            .setCustomId(`inputInvestment`)
            .setTitle(`Invest Selector`);

        const textInput = new TextInputBuilder()
            .setCustomId("investInput")
            .setLabel("Enter Investment")
            .setRequired(true)
            .setStyle(TextInputStyle.Short);

        modal.addComponents(new ActionRowBuilder().addComponents(textInput));

        await interaction.showModal(modal);


    }
}