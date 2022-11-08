const mongoose = require("mongoose");
const CountryData = require("../../app.js");
const User = require("../../schemas/user");
const War = require("../../schemas/war");
const Alliance = require("../../schemas/alliance");
const WarName = require("../../schemas/warName");
const Guild = require("../../schemas/guild");

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
    const input = interaction.fields.getTextInputValue("warInput");
    const Users = await User.find();
    const Alliances = await Alliance.find();
    const Wars = await War.find();
    const WarNames = await WarName.find();

    var allianceFound = false;
    for (const alliance of Alliances) {
      if (alliance.Name === input) allianceFound = true;
    }
    if (!allianceFound) {
      await interaction.reply({
        content: `Alliance ${input} Not Found`,
      });
      console.log(`Alliance Not Found`);
      return;
    }

    for (const alliance of Alliances) {
      for (const member of alliance.Members) {
        var user = await User.findOne({ userName: member.Name });
        if (!user.War) {
          createWar(user);
        }
        for (const warName of WarNames) {
          if (user.War === warName.Name) {
            console.log(`User Is Already At War`);
          }
        }
      }
    }

    async function createWar(cb) {
      var names = [];
      var allianceA;
      var members = [];
      var armySize;

      for (const warname of WarNames) {
        for (const war of Wars) {
          if (warname === war.Name) break;
        }
        names.push(warname);
      }
      for (const alliance of Alliances) {
        for (const member of alliance.Members) {
          if (member.Name === interaction.user.tag) allianceA = alliance;
          if (alliance === allianceA) members.push({ Name: member.Name });
          var user = await User.findOne({ userName: interaction.user.tag });
          if (alliance === allianceA) armySize = user.ArmySize;
        }
      }
      var enemyMembers = [];
      var enemyArmySize;
      for (const alliance of Alliances) {
        for (const member of alliance.Members) {
          if (alliance.Name.toLowerCase() === input.toLowerCase()) {
            enemyMembers.push({ Name: member.Name });
            var users = await User.find({ Alliance: alliance.Name });
            for (const user of users) {
              enemyArmySize += user.ArmySize;
            }
          }
        }
      }
      var guild = await Guild.findOne({ guildId: interaction.guild.id });
      const name = names[Math.floor(Math.random() * names.length)];
      const warProfile = new War({
        _id: name,
        Name: name,
        AllianceA: {
          AllianceName: allianceA.Name,
          Members: members,
          MoneyInvested: 0,
          ArmyCount: armySize,
        },
        AllianceB: {
          AllianceName: input,
          Members: enemyMembers,
          MoneyInvested: 0,
          ArmyCount: enemyArmySize,
        },
        Date: guild.Year,
        Victor: null,
      });
    }
  },
};
