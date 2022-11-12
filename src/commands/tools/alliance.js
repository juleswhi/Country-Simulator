const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  EmbedBuilder,
  ChannelType,
} = require("discord.js");
const Alliance = require("../../schemas/alliance");
const User = require("../../schemas/user");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("alliance")
    .addStringOption((option) =>
      option.setName("method").setDescription("Type 'create' or 'join'")
    )
    .setDescription("Form or Join an alliance!"),
  async execute(interaction, client) {
    // make option for craeting or joining alliance
    // potentially for viewing alliance details - maybe /alliancestats
    // option for viewing all alliances
    var alliances = await Alliance.find();
    var AllianceName;
    for (const alliance of alliances) {
      for (const user of alliance.Members) {
        if (user.Name === interaction.user.tag) {
          AllianceName = alliance.Name;
        }
      }
    }
    var modal;
    var textInput;

    if (interaction.options.getString(`method`) === `create`) {
      modal = new ModalBuilder()
        .setCustomId(`createAlliance`)
        .setTitle(`Alliance Creator`);

      textInput = new TextInputBuilder()
        .setCustomId("createAllianceInput")
        .setLabel("Enter Your Chosen Alliance Name")
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

      console.log(`Adding Components`);

      modal.addComponents(new ActionRowBuilder().addComponents(textInput));
      console.log(`Showing Modal`);
      await interaction.showModal(modal);
    } else if (interaction.options.getString(`method`) === `join`) {
      modal = new ModalBuilder()
        .setCustomId(`joinAlliance`)
        .setTitle(`Alliance Joiner`);

      textInput = new TextInputBuilder()
        .setCustomId("joinAllianceInput")
        .setLabel("Enter Alliance To Join")
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

      modal.addComponents(new ActionRowBuilder().addComponents(textInput));
      await interaction.showModal(modal);

      
    } else if (interaction.options.getString(`method`) === `list`) {
      console.log(`Listing Alliances`);
      // list alliances
      const alliances = await Alliance.find();

      const embed = new EmbedBuilder()
        .setTitle(`All Alliances`)
        .setDescription(`This is all of the alliances`);

      // embed.addFields([
      //   {name: `Alliances`,}

      // ]);

      for (const alliance of alliances) {
        var str = [];
        for (const member of alliance.Members) {
          str.push(` ${member.Name}`);
        }
        embed.addFields([
          { name: `${alliance.Name}`, value: `Members: ${str}` },
        ]);
      }

      await interaction.reply({
        embeds: [embed],
      });
    } else if (interaction.options.getString(`method`) === `stats`) {
      console.log(`Stats`);
      const alliances = await Alliance.find();

      for (const alliance of alliances) {
        for (const member of alliance.Members) {
          if (member.Name === interaction.user.tag) {
            console.log(`Alliance Is ${alliance.Name}`);

            const embed = new EmbedBuilder()
              .setTitle(`${alliance.Name}'s Stats`)
              .setDescription(`A collection of ${alliance.Name}'s Statistics`);

            embed.addFields([
              { name: `Name`, value: `${alliance.Name}` },
              {
                name: `Money Stored`,
                value: `${alliance.Money}B`,
                inline: true,
              },
              { name: `Join Fee`, value: `${alliance.JoinFee}B`, inline: true },
            ]);

            await interaction.reply({
              embeds: [embed],
            });
          }
        }
      }
    }
    var embed;
    if (!embed) {
      try {
        await interaction.reply({});
      } catch (error) {}
    }
  },
};
