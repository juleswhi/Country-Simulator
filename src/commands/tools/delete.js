const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const CountryData = require("../../app.js");
const chalk = require("chalk");
const User = require("../../schemas/user");
const Alliance = require("../../schemas/alliance");
const Company = require("../../schemas/company")
const { Countries } = require("../../app");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("delete")
    .setDescription("returns pong")
    .addStringOption((option) =>
      option.setName(`input`).setDescription(`input for deletion`)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    const Countries = CountryData.Countries;
    if (interaction.options.getString(`input`) === `user`) {
      console.log(`deleting user ${interaction.user.tag}`);
      await User.deleteOne({ userName: interaction.user.tag });
      await interaction.reply(`Deleting user`);
    } else if (interaction.options.getString(`input`) === `alliance`) {
      console.log(`deleting alliances with ${interaction.user.tag}`);
      await Alliance.deleteMany({ CountryA: interaction.user.tag });
      await interaction.reply(`deleting alliuance`);
    } else if(interaction.options.getString(`input`) === `companies`)
    {
      console.log(`deleting all companies`);
      await Company.deleteMany();
      await interaction.reply(`deleting companies`)
    } 
    else if (interaction.options.getString(`input`) === `all`) {
      const guild = await client.guilds.cache.get("1032948591112765510");
      console.log(chalk.red(`WARNING: DELETING EVERYTHING`));
      await User.deleteMany();
      await Alliance.deleteMany();
      await Company.deleteMany();
      for (const country of Countries) {
        console.log(`Country is: ${country}`);
        if (
          interaction.guild.roles.cache.find((r) => r.name === `${country}`)
        ) {
          console.log(`in role if statement`);
          interaction.guild.roles.cache.delete((r) => r.name === `${country}`);
          console.log(
            `Deleted Role: ${interaction.guild.roles.cache.find(
              (r) => r.name === `${country}`
            )}`
          );
        }
        //     if (guild.channels.cache.find((r) => r.name === `${country}`)) {
        //       console.log(`in channel if statement`);
        //       const fetch = await guild.channels.cache.find(
        //         (r) => r.name === `${country}`
        //       );
        //       console.log(chalk.blue(`Fetched ${await fetch}`));
        //     //   console.log(chalk.blue(`Fetched ${await fetch2}`));
        //       const fetch3 = await guild.channels.cache.find(
        //         (r) => r.parentId === fetch
        //       );
        //       console.log(chalk.blue(`Fetched ${fetch3}`));
        //       fetch3.delete().then(console.log(chalk.red(`deleted fetch3`)));
        //       fetch.delete().then(console.log(chalk.red(`deleted fetch`)));
        //     //   fetch2.delete().then(console.log(chalk.red(`deleted fetch2`)));
        //     }
      }
      await interaction.reply(`deleting everything`);
    }
  },
};
