module.exports = {
    data: {
        name: `hello`
    },
    async execute(interaction, client)
    {
        await interaction.reply({
            content: `Hello There!`
        })
    }
}