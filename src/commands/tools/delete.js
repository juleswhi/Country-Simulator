const { SlashCommandBuilder } = require('discord.js')
const User = require("../../schemas/user");
const Alliance = require("../../schemas/alliance")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('returns pong'),
    async execute( interaction, client )
    {
        
        
        await Alliance.deleteMany();
        // await User.deleteMany();
        

    }
}