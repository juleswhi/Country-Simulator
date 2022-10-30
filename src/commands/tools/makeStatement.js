const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, PermissionsBitField } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('state')
        .setDescription('Type a statement!'),
    async execute( interaction, client )
    {
     
        const modal = new ModalBuilder()
            .setCustomId(`inputStatement`)
            .setTitle(`Alliance Selector`);

        const textInput = new TextInputBuilder()
            .setCustomId("statementInput")
            .setLabel("Please Enter Your Statement")
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph);

            modal.addComponents(new ActionRowBuilder().addComponents(textInput));

            await interaction.showModal(modal);
        
    }
}
