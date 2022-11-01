const CountryData = require("../../app.js");
const User = require("../../schemas/user");
const Resources = require("../../app.js");
const mongoose = require("mongoose");
const { find } = require("../../schemas/user");
const { ChannelType, PermissionsBitField } = require("discord.js");

module.exports = {
  data: {
    name: `inputCountry`,
  },
  async execute(interaction, client) {
    try {
      await interaction.reply({});
    } catch (err) {}
  },
  async run(interaction, client) {
    const resources = Resources.Resources;
    let hasCountry = false;
    let Country = null;
    const channel = client.channels.cache.find(
      (channel) => channel.name === "statements"
    );
    const choices = CountryData.Countries;
    for (const CountryChoice of choices) {
      if (
        interaction.fields.getTextInputValue("countryInput").toLowerCase() ===
        CountryChoice.toLowerCase()
      ) {
        // channel.send(`Your Country of choice is, ${CountryChoice}`);
        Country = CountryChoice;
        hasCountry = true;
      }
    }
    if (!hasCountry) {
      channel.send(
        `Your Country Was Not Recognised :(, \n type /countries to see all available countries`
      );
      return;
    }

    let userProfile = await User.findOne({ userName: interaction.user.tag });
    const userData = await User.find();
    let CountryTaken = false;
    for (const user of userData) {
      if (user.Country === Country) CountryTaken = true;
      else CountryTaken = false;
    }

    if (!userProfile && !CountryTaken) {
      const propMoney = (Math.floor(Math.random() * 501) + 1).toString();
      userProfile = await new User({
        _id: mongoose.Types.ObjectId(),
        userName: interaction.user.tag,
        Country: Country,
        ApprovalRating: (Math.floor(Math.random() * 100) + 1).toString(),
        Resources: {
          InvestMoney: `${propMoney.toString()}B`,
          YearlyIncome: `${(propMoney / 100).toString()}B`,
          SpecialResource:
            resources[Math.floor(Math.random() * resources.length)],
          InvestedCompanies: [],
        },
        land: [Country],
      });

      const guild = await client.guilds.cache.get("1032948591112765510");
      console.log(`User Profile = ${userProfile}`);
      (async () => {
        let every = guild.roles.cache.find(
          (r) => r.name === `${userProfile.Country}`
        );
        every = String(every);
        const CountryRole = await guild.roles.create({
          name: `${userProfile.Country}`,
        });
        console.log(`Country ROLE:` + CountryRole);
        guild.channels.create({
          name: `${userProfile.Country}`,
          type: ChannelType.GuildCategory,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.Connect],
              deny: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.Speak, PermissionsBitField.Flags.MentionEveryone],
            },
            {
              id: CountryRole,
              allow: [
                PermissionsBitField.Flags.ViewChannel,
                PermissionsBitField.Flags.SendMessages,
                PermissionsBitField.Flags.Speak
              ],
            },
          ],
        });

        // const cat = guild.channels.cache.find((channel) => channel.name === `${userProfile.Country}`);

        if (
          interaction.guild.roles.cache.find(
            (r) => r.name === `${userProfile.Country}`
          )
        ) {
          let role = interaction.guild.roles.cache.find(
            (r) => r.name === `${userProfile.Country}`
          );
          let member = interaction.member;
          member.roles.add(role).catch(console.error);
        }

        let role = interaction.guild.roles.cache.find(
          (r) => r.name === `${userProfile.Country}`
        );
        let member = interaction.member;
        member.roles.add(role).catch(console.error);
        console.log(
          `Found Role: ${await CountryRole} and added ${
            interaction.user.tag
          } to it`
        );

        const everyoneRole = guild.roles.everyone;

        console.log(`Every role = ${await every}`);

        console.log(`Found Role Everyone: ${everyoneRole}`);

        let statementPointer = await guild.channels.create({
          name: `${userProfile.Country}-statements`,
          type: ChannelType.GuildText,
          permissionOverwrites: [{ id: interaction.guild.id, allow: [PermissionsBitField.Flags.SendMessages] }],
        });
        let meetingPointer = await guild.channels.create({
          name: `gov-meetings`,
          type: ChannelType.GuildVoice,
        });

        statementPointer = String(statementPointer);
        meetingPointer = String(meetingPointer);
        console.log(`Searching`);
        let category = guild.channels.cache.find(
          (ch) => ch.name === `${userProfile.Country}`
        );
        console.log(`Category ID: ${category.id}`);
        console.log(
          `Channel Statements ID: ${await statementPointer.substring(2, 21)}`
        );
        console.log(
          `Channel Meetings ID: ${await meetingPointer.substring(2, 21)}`
        );
        let statementchannel = await guild.channels.cache.find(
          (ca) => ca.id === statementPointer.substring(2, 21)
        );
        let meetingchannel = await guild.channels.cache.find(
          (ca) => ca.id === meetingPointer.substring(2, 21)
        );

        // await statementchannel.permissionOverwrites.create(statementchannel.guild.roles.everyone, { ViewChannel: false });
        // console.log(`Set Permissions For @everyone`)
        // statementchannel.permissionOverwrites.create(statementchannel.guild.roles.everyone, { ViewChannel: false });

        if (category && statementchannel && meetingchannel) {
          await statementchannel.setParent(category.id);
          await meetingchannel.setParent(category.id);
          statementchannel
            .lockPermissions()
            .then(console.log(`Locked Permissios For ${statementchannel}`));
          meetingchannel
            .lockPermissions()
            .then(console.log(`Locked Permissions For ${meetingchannel}`));
        } else
          console.error(
            `Missing Category Or Channel \nCategory: ${!!category} \nChannel Meeting: ${!!meetingchannel} \nChannel Statements: ${!!statementchannel}`
          );
      })();

      await userProfile.save().catch(console.error);
      await interaction.reply({
        content: `${interaction.user.tag} Has been added to the database, with country ${Country}`,
      });
      console.log(userProfile);
    } else {
      let message;
      if (!userProfile && CountryTaken)
        message = `Your Country [ ${Country} ] has already been taken, Please Select A differnt Country`;
      if (userProfile)
        message = `You have already been added to the database, use /help to decide your next move!`;
      await interaction.reply({
        content: message,
      });
      console.log(userProfile);
    }
  },
};
