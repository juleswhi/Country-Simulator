<<<<<<< HEAD
const { SlashCommandBuilder, EmbedBuilder, Embed} = require('discord.js')
const fs = require('fs')
=======
const { SlashCommandBuilder } = require('discord.js')
>>>>>>> main

module.exports = {
    data: new SlashCommandBuilder()
        .setName('claim')
<<<<<<< HEAD
        .setDescription('claims a country'),
    async execute( interaction, client )
    {
=======
        .setDescription('Claims a country'),
        
        
    async execute( interaction, client )
    {

        let CountryName, UserApprovalRating, CountryInvestMoney, CountryYearlyIncome, CountrySpecialResource
        UserApprovalRating = 50

        const newCountry = 
        {
            Name: `${CountryName}`,
            User: `${interaction.user.tag}`,
            ApprovalRating: `${UserApprovalRating}`,
            Resources: 
            {
                "InvestMoney": `${CountryInvestMoney}`,
                "YearlyIncome": `${CountryYearlyIncome}`,
                "SpecialResource": `${CountrySpecialResource}`
            }
        }




>>>>>>> main
        const message = await interaction.deferReply({
            fetchReply: true
        });

<<<<<<< HEAD
        const newMessage = ``
=======
        const newMessage = `Your country is ${interaction.options}`
>>>>>>> main
        await interaction.editReply({
            content: newMessage
        });
        
        
    }
}