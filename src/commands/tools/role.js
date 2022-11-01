const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("role").setDescription("does stuff"),
  async execute(interaction, client) {
    try {
      await interaction.reply();
    } catch (error) {}
    const guild = await client.guilds.cache.get("1032948591112765510");
    //   guild.roles.create({
    //     name: "Mod",
    //     permissions: PermissionsBitField.Flags.Administrator
    //   })

    // if(interaction.user.permissions.has(PermissionsBitField.Flags.Administrator))
    // {
    //     console.log(`Swag`)
    // }


    let role = interaction.guild.roles.cache.find((r) => r.name === `Mod`)
    console.log(`Found Role: ${role}`)
    let member = interaction.member;
    console.log(`Found Member: ${member}`)
    member.roles.add(role).catch(console.error)
    console.log(`Added role to member`)



  },
};
