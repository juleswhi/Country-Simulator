const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('claim')
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




        const message = await interaction.deferReply({
            fetchReply: true
        });

        const newMessage = `Your country is ${interaction.options}`
        await interaction.editReply({
            content: newMessage
        });
        
        
    }
}