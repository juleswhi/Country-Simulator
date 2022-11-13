const Alliance = require("../../schemas/alliance");
const User = require("../../schemas/user");
const Request = require("../../schemas/request");

module.exports = {
  data: {
    name: "AcceptAllianceRequest",
  },
  async execute(interaction, client) {
    const reqs = await Request.find();
    const incomingUser = await User.findOne({ userName: interaction.user.tag });
    var reqUser;
    var reqAlly;
    let found;
    if(!incomingUser.Alliance) return;
    for (const req of reqs) {
      if (
        req.requestingAlliance.toLowerCase() ===
        incomingUser.Alliance.toLowerCase()
      ){
          found = true;
          reqUser = req.requestingUser;
          reqAlly = req.requestingAlliance;
      }
    }

    if (found) {
    await Request.deleteOne({ requestingUser: reqUser, requestingAlliance: reqAlly});
     
     var allianceProfile = await Alliance.findOne({ Name: reqAlly });
     var user = await User.findOne({ userName: reqUser });
     console.log(`User is ${user.userName}`)
     console.log(`Found Alliance ${allianceProfile.Name}`)
      const allianceNewMember = {
        Name: user.userName,
        MoneyContributed: allianceProfile.JoinFee,
        Chairman: false,
      };


      allianceProfile.Members.push(allianceNewMember);

      await allianceProfile.save();
      const investMoney = user.Money.InvestMoney;
      user.Money.InvestMoney = investMoney - 20;
      user.Alliance = allianceProfile.Name;
      await user.save();
      const channel = client.channels.cache.find(
        (channel) => channel.name === `statements`
      );
      channel.send(`${user.Country} (${user.userName}) Has Joined The Alliance: ${allianceProfile.Name}`);
      await interaction.reply({content: `Successfully Added ${user.userName}`, ephemeral: true})
    }
  },
};
