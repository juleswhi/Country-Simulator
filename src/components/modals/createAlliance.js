const mongoose = require("mongoose");
const CountryData = require("../../app.js");
const User = require("../../schemas/user");
const Alliance = require("../../schemas/alliance");
const War = require("../../schemas/war");
const alliance = require("../../schemas/alliance");

module.exports = {
  data: {
    name: `createAlliance`,
  },
  async execute(interaction, client) {
    try {
      await interaction.reply({});
    } catch (err) {}
  },
  async run(interaction, client) {
    // console.log(`Creating Alliance with country ${interaction.fields.getTextInputValue("createAllianceInput").toLowerCase()}`);
    const alliances = await Alliance.find();
    const users = await User.findOne({ userName: interaction.user.tag });
    const ChosenName = interaction.fields.getTextInputValue(
      "createAllianceInput"
    );
    var taken;
    for (const alliance of alliances) {
      // console.log(`In Loop`)
      if (alliance.Name.toLowerCase() === ChosenName.toLowerCase()) {
        console.log("Name Already Taken");
        taken = true;
      }
      // console.log(`alliance members: ${alliance.Members.Name}`)
      for (const user of alliance.Members) {
        // console.log(user)
        if (user.Name === interaction.user.tag) {
          taken = true;
          console.log("User Already In An Alliance");
          // break;
        }
      }
    }

    if (taken) return;

    // console.log(`Setting Name As ${ChosenName}`);
    const allianceProfile = await new Alliance({
      _id: mongoose.Types.ObjectId(),
      Name: ChosenName,
      Members: [{ Name: interaction.user.tag, MoneyContributed: 35 }],
      Money: 35,
      JoinFee: 20,
    });
    await allianceProfile
      .save()
      .then(console.log(`Saved ${allianceProfile.Name}`))
      .catch(console.error);


      let doc = await User.findOne({ userName: interaction.user.tag });
      doc.Alliance = allianceProfile.Name;
      const money = doc.Money.InvestMoney;
      doc.Money.InvestMoney = money - 35;
      await doc.save();
      await interaction.reply({});
  },
};
