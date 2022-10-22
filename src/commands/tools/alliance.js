const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js')

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('formAlliance')
        .setType(ApplicationCommandType.User),
    async execute( interaction, client )
    {
        
        await interaction.reply({
            content: `${interaction.targetUser.displayAvatarURL()}`
        });

    }
}