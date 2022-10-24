const mongoose = require("mongoose");
const CountryData = require("../../app.js");
const User = require("../../schemas/user");

module.exports = {
  data: {
    name: `inputWar`,
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `Going To War`,
    });
  },
  async run(interaction, client) {
    const choices = CountryData.Countries;

    const userData = await User.findOne({ name: interaction.user.tag });

    const allUserData = await User.find();

    for (const CountryChoice of choices) {
        if (
          CountryChoice.toLowerCase() ===
          interaction.fields.getTextInputValue("warInput").toLowerCase()
          &&
          userData != null
          ) {
          for(const users of allUserData)
          {
            const enemy = userData.Relations.enemy;
            if(users.Country === CountryChoice)
            {
              
                if(enemy === users.userName)
                {
                  console.log(`You are already at war with ${users.userName}!`)
                  return;
                }
              
            
              console.log(`At war with user: ${interaction.user.tag} with country: ${CountryChoice}`);
              const filter = { userName: interaction.user.tag };
              const update = 
              {
                $set: 
                {
                  Relations:
                  {
                    enemy: users.userName
                  }
                }
              }
              const result = await User.updateOne(filter, update);
              const channel = client.channels.cache.find(
                (channel) => channel.name === "statements"
              );
              if(users.Relations.enemy === userData.userName && userData.Relations.enemy === users.userName)
              {
                channel.send(`${users.userName} is now at war with ${userData.userName}`)
              }
            }
          }
        }
      }
  },
};
