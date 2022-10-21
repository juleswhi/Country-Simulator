const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js')
const fs = require('fs')
const myCountryData = require('../../app.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Returns the users stats'),
    async execute( interaction, client )
    {
        const CountryData = myCountryData.CountryData;
       
    //    console.log(interaction.user.tag)
       const embed = new EmbedBuilder()
            .setTitle(`${interaction.user.tag}'s Stats`)
            .setDescription(`These Are Your Contries Statistics`)
            .setColor(0x18e1ee)
            // .setURL()
            // .setImage()
            // .setThumbnail



            .setTimestamp(Date.now()) // Potentially create custom time scale, 1 day irl = 1 year
            // .addFields([
            //     { name: `Country Name`, value: `Poland` },
            //     { name: `Investment Money`, value: `100B`, inline: true},
            //     { name: `Yearly Income`, value: `1B`, inline: true},
            //     { name: `Special Resource`, value: `Drugs`},
            //     { name: `Approval Rating`, value: `70`}
            // ])

            for(const Country of CountryData)
            {
                if(Country.User === interaction.user.tag)
                {
                    embed.addFields([
                        { name: `Country Name`, value: Country.Name },
                        { name: `Investment Money`, value: Country.Resources.InvestMoney, inline: true},
                        { name: `Yearly Income`, value: Country.Resources.YearlyIncome, inline: true},
                        { name: `Special Resource`, value: Country.Resources.SpecialResource},
                        { name: `Approval Rating`, value: Country.ApprovalRating}
                    ])
                    console.log()
                }
            }

            
            await interaction.reply({
                embeds: [embed]
            })
    }
}