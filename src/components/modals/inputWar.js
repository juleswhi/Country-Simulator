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
      var enemyAllianceName;
      var enemyUser = await User.findOne({ Alliance: input });

      var allyAllianceName;
      var use = await User.findOne({ userName: interaction.user.tag });
      for(const alliance of Alliances) for(const member of alliance.Members) if(member.Name === interaction.user.tag) allyAllianceName = alliance.Name;

      if(!use.Alliance) allyAllianceName = use.userName;
      if(!use.Alliance) members = null;
      if(!enemyUser.Alliance) enemyAllianceName = enemyUser.userName;
      else enemyAllianceName = input;
      if(!enemyUser.Alliance) enemyMembers = null;
      var guild = await Guild.findOne({ guildId: interaction.guild.id });
      const name = names[Math.floor(Math.random() * names.length)];
      const warProfile = new War({
        _id: name,
        Name: name,
        AllianceA: {
          AllianceName: allyAllianceName,
          Members: members,
          MoneyInvested: 0,
          ArmyCount: armySize,
        },
        AllianceB: {
          AllianceName: enemyAllianceName,
          Members: enemyMembers,
          MoneyInvested: 0,
          ArmyCount: enemyArmySize,
        },
        Date: guild.Year,
        Victor: null,
      });
      await warProfile.save();

      const channel = client.channels.cache.find((channel) => channel.name === "statements");
      channel.send(`${warProfile.allianceA.AllianceName} has declared war on ${warProfile.AllianceB.AllianceName}`);
    }
  },
};
