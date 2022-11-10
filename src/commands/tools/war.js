const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('war')
        .setDescription('go to war!'),
    async execute( interaction, client )
    {
     
        const modal = new ModalBuilder()
            .setCustomId(`inputWar`)
            .setTitle(`War Selector`);

        const textInput = new TextInputBuilder()
            .setCustomId("warInput")
            .setLabel("Enter Country/Alliance To Attack")
            .setRequired(true)
            .setStyle(TextInputStyle.Short);

            modal.addComponents(new ActionRowBuilder().addComponents(textInput));

            await interaction.showModal(modal);
        
    }
}