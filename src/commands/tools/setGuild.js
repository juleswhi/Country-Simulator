const Guild = require("../../schemas/guild");
const { SlashCommandBuilder } = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("database")
    .setDescription("returns information from the database"),
  async execute(interaction, client) {
    const date = new Date("January 1, 1000, 12:00:00");
    let guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
    if (!guildProfile) {
      guildProfile = await new Guild({
        _id: mongoose.Types.ObjectId(),
        guildId: interaction.guild.id,
        guildName: interaction.guild.name,
        Year: date.toUTCString(),
        guildIcon: interaction.guild.iconURL()
          ? interaction.guild.iconURL()
          : "None.",
      });

      await guildProfile.save().catch(console.error);
      await interaction.reply({
        content: `Server name: ${guildProfile.guildName}`,
      });
      console.log(guildProfile);
    } else {
      var profile = await Guild.findOne({ guildId: interaction.user.tag });
      profile.guildName = interaction.guild.name;
      await profile.save().then(console.log(`Saved profile`)).catch(console.error)
      await interaction.reply({
        content: `Server name: ${guildProfile.guildId}`,
      });
      console.log(guildProfile);
    }
  },
};
