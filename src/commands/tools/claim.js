const { SlashCommandBuilder, EmbedBuilder, Embed} = require('discord.js')
const fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('claim')
        .setDescription('claims a country'),
    async execute( interaction, client )
    {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const newMessage = ``
        await interaction.editReply({
            content: newMessage
        });
        
        
    }
}