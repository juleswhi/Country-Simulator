const { SlashCommandBuilder } = require('discord.js')
const User = require("../../schemas/user");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('returns pong'),
    async execute( interaction, client )
    {
        
        await interaction.reply()
        {
            content: `deleted`
        }
        await User.deleteMany();
        

    }
}