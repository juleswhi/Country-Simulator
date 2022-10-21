const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('returns pong'),
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