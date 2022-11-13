const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
const User = require("../../schemas/user");
const Alliance = require("../../schemas/alliance");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Dissolve an alliance!"),
  async execute(interaction, client) {
    const Users = await User.find();
    const Alliances = await Alliance.find();

    for (const alliance of Alliances) {
      for (const member of alliance.Members) {
        if (member.Name === interaction.user.tag) {
          var allianceProfile = await Alliance.findOne({
            Name: alliance.Name,
          });
          const index = allianceProfile.Members.findIndex((object) => {
            return object.Name === interaction.user.tag;
          });
          if (index > -1) {
            allianceProfile.Members.splice(index, 1);
          }
          

          if (allianceProfile.Members.length === 0) {
            await Alliance.deleteOne({ Name: alliance.Name });
            console.log(`Alliance ${alliance.Name} has been Dissolved`);
            await interaction.reply(
                `Alliance ${alliance.Name} has been Dissolved`
              );
          } else {
            allianceProfile.save();
            await interaction.reply(
              `Removed ${interaction.user.tag} from alliance ${alliance.Name}`
            );
          }

          var userProfile = await User.findOne({
            userName: interaction.user.tag,
          });
          userProfile.Alliance = null;
          await userProfile.save();

          return;
        }
      }
    }
    await interaction.reply(`Looks Like You Aren't In an alliance :(`);
  },
};
