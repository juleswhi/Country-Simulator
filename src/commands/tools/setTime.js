const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Guild = require("../../schemas/guild");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("settime")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription("returns pong"),
  async execute(interaction, client) {
    const date = new Date("January 1, 1000, 12:00:00");
    var guild = await Guild.findOne({ guildId: interaction.guild.id });
    guild.Year = date.toUTCString();
    await guild.save().then(console.log(`Saved Guild`)).catch(console.error);
  },
};
