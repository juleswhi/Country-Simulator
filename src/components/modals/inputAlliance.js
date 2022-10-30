const mongoose = require("mongoose");
const CountryData = require("../../app.js");
const User = require("../../schemas/user");
const Alliance = require("../../schemas/alliance");
const War = require("../../schemas/war");

module.exports = {
  data: {
    name: `inputAlliance`,
  },
  async execute(interaction, client) {
    try {
      await interaction.reply({});
    } catch (err) {}
  },
  async run(interaction, client) {
    const choices = CountryData.Countries;

    const userData = await User.findOne({ name: interaction.user.tag });

    const allUserData = await User.find();

    const allAllianceData = await Alliance.find();

    const allWarData = await War.find();

    let countryAally = false;
    let countryBally = false;

    for (const CountryChoice of choices) {
      if (
        CountryChoice.toLowerCase() ===
          interaction.fields.getTextInputValue("allianceInput").toLowerCase() &&
        userData != null
      ) {
        for (const users of allUserData) {
          if (users.Country === CountryChoice) {
            for (const alliance of allAllianceData) {
              if (
                alliance.CountryA === interaction.user.tag &&
                alliance.CountryB === users.userName
              ) {
                  countryAally = true;
              }
              if (
                alliance.CountryA === users.userName &&
                alliance.CountryB === interaction.user.tag
              ) {
                countryBally = true;
              }
            }

            console.log(countryAally)
            console.log(countryBally)


            
            const alliance = {
              _id: mongoose.Types.ObjectId(),
              CountryA: interaction.user.tag,
              CountryB: users.userName,
            };
            
            // const result = await Alliance.create(alliance);
            // console.log(
            //   `An alliance between ${result.CountryA} and ${result.CountryB} has been made`
            //   );
              const statementsChannel = client.channels.cache.find(
                (channel) => channel.name === "statements"
                );
                
              if(countryAally && countryBally)
              {
                console.log(`Both Countries Are Allianced`)
              }
              else if(countryAally && !countryBally)
              {
                console.log(`Country A has a Alliance Request, But not country B`)
              } 
              else if(!countryAally && countryBally)
              {
                const result = await Alliance.create(alliance);
                console.log(`Creating alliance request from country a to country b`)
              }
              else if(!countryAally && !countryBally)
              {
                const result = await Alliance.create(alliance);
                console.log(`Creating alliance request from country a to country b`)
              }
            // statementsChannel.send(
            //   `An alliance between ${result.CountryA} and ${result.CountryB} has been made`
            // );
          }
        }
      }
    }
  },
};
