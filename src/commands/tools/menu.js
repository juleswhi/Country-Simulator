const { SlashCommandBuilder, SelectMenuBuilder, ActionRowBuilder, SelectMenuOptionBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('menu')
        .setDescription('Gives a menu of available countries'),
    async execute( interaction, client )
    {
        const menu = new SelectMenuBuilder()
        .setCustomId(`selectCountry`)
        .setMinValues(1)
        .setMaxValues(1)
        .setOptions(new SelectMenuOptionBuilder({
            label: `Option #1`,
            value: `Option One`
        }), new SelectMenuOptionBuilder({
            label: `Option #2`,
            value: `Option Two`
        }))
            
            
    
        await interaction.reply({
            components: [new ActionRowBuilder().addComponents(menu)]
        })
    
    }
}