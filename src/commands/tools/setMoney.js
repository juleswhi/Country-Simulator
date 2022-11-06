const { SlashCommandBuilder } = require('discord.js')
const User = require('../../schemas/user')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('money')
        .setDescription('Set Money')
        .addStringOption((option) => 
            option.setName("amount").setDescription("Amount To Set Money To")
        ),
    async execute( interaction, client )
    {
     
        var user = await User.findOne({ userName: interaction.user.tag });
        try {
            user.Money.InvestMoney = parseInt(interaction.options.getString("amount"));
        } catch (error) {
            console.log(`entered value was not a number`)
        }

        user.save();
        
    }
}