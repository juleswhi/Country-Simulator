const mongoose = require("mongoose");
const CountryData = require("../../app.js");
const User = require("../../schemas/user");
const War = require("../../schemas/war");
const Alliance = require("../../schemas/alliance");

module.exports = {
  data: {
    name: `inputWar`,
  },
  async execute(interaction, client) {
    try {
      await interaction.reply({});
    } catch (err) {}
  },
  async run(interaction, client) {
    const Users = await User.find();
    const Alliances = await Alliance.find();
    const Wars = await Alliance.find();


    

    for(const alliance of Alliances)
    {
      for(const member of alliance.Members)
      {
        if(Wars)
        {
          for(const War of Wars)
          {
        // if(War.Name)
          }
        }
      }
    }

    function createWar()
    {

    }


  },
};
