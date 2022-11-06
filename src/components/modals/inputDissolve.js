const mongoose = require("mongoose");
const CountryData = require("../../app.js");
const User = require("../../schemas/user");
const Alliance = require("../../schemas/alliance");
const War = require("../../schemas/war");
const { UserFlags } = require("discord.js");

module.exports = {
  data: {
    name: `inputDissolve`,
  },
  async execute(interaction, client) {
    try {
      await interaction.reply({});
    } catch (err) {}
  },
  async run(interaction, client) {
      


  },
};
