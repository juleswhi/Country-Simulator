const mongoose = require("mongoose");
const CountryData = require("../../app.js");
const User = require("../../schemas/user");

module.exports = {
  data: {
    name: `inputAlliance`,
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `Forming Alliance`,
    });
  },
  async run(interaction, client) {
    const choices = CountryData.Countries;

    const userData = await User.findOne({ name: interaction.user.tag });

    const allUserData = await User.find();

    
    for (const CountryChoice of choices) {
      if (
        CountryChoice.toLowerCase() ===
        interaction.fields.getTextInputValue("allianceInput").toLowerCase()
        &&
        userData != null
        ) {
        for(const users of allUserData)
        {
          const allies = userData.Relations.ally;
          if(users.Country === CountryChoice)
          {
            for(const ally of allies)
            {
              if(ally === users.userName)
              {
                console.log(`You are already allianced with ${users.userName}!`)
                return;
              }
            }
            
            console.log(`Forming Alliance with user: ${interaction.user.tag} with country: ${CountryChoice}`);
            const filter = { userName: interaction.user.tag };
            const update = 
            {
              $set: 
              {
                Relations:
                {
                  ally: [allies.toString(), users.userName]
                }
              }
            }
            const result = await User.updateOne(filter, update);
            const channel = client.channels.cache.find(
              (channel) => channel.name === "statements"
            );
            if(users.Relations.ally === userData.userName && userData.Relations.ally === users.userName)
            {
              channel.send(`${users.userName} is now allianced with ${userData.userName}`)
            }
          }
        }
      }
    }
  },
};
