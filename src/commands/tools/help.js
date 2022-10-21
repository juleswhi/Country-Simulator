const { SlashCommandBuilder, EmbedBuilder, Embed} = require('discord.js')
const fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Returns a helpful help menu'),
    async execute( interaction, client )
    {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const newMessage = `API latency: ${client.ws.ping}\nClient Ping: ${message.createdTimeStamp - interaction.createdTimeStamp}`
        await interaction.editReply({
            content: newMessage
        });
        
        
    }
}