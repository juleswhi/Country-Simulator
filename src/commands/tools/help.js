const {
  SlashCommandBuilder,
  EmbedBuilder,
  Embed,
  PermissionFlagsBits,
} = require("discord.js");
const User = require("../../schemas/user");
const fs = require("fs");
const mongoose = require("mongoose");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("longhelp")
    .setDescription("Returns the users stats")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    //    console.log(interaction.user.tag)
    const details = new EmbedBuilder()
      .setTitle(`Introduction`)
      .setDescription(`Please Read!`)
      .setColor(0x18e1ee);
    // .setURL()
    // .setImage()
    // .setThumbnail

    // .setTimestamp(Date.now()); // Potentially create custom time scale, 1 day irl = 1 year

    details.addFields([
      { name: `Welcome`, value: "Welcome To Discord United Nations!" },
      {
        name: `How Does It Work?`,
        value: `Its quite simple!\nEverybody has their own Country (To start off with)\nOnce you have claimed your country, you can make alliances, start wars, incite revolutions, research new technologies,\nThere are many, many possibilities`,
      },
      {
        name: `Going To War`,
        value: `Going to war is quite difficult, and costworthy, so before initiating warefare, consider what could be gained from it
        \nGoing to war is only available if you pass three criteria: \n Criteria 1: At Least 50B worth of available funds \nCriteria 2: At least 10 Percent of your total population be enrolled in the army \nCriteria 3: At least a Approval Rating of 50\n\nAnnouncing war on a nation will be publicly announced in the United Nations, So be wary`,
      },
      {
        name: `Creating Alliances`,
        value: `Compared To going to war, creating an alliance is easy peasy
        Alliances are split into groups, creatively named alliance groups \nAlliance groups can be created for a small fee of 35B, or they can be joined for a fee chosen by the creator of the group\nTo note: To join a group, you must be voted in by majority vote`,
      },
      {
        name: `Investing`,
        value: `Investing In Resources Can Be The Sole reason for your countries reign or fall\nEach Country has a special resource, investing in this resource will have a exponential increase in profits (It's really worth it)`,
      },
      {
        name: `Statements`,
        value: `Creating Statements are the most effective way to communicate Intentions to every country\nNote: when creating a statement you are able to @ everyone, whereas without it you are not!\nStatements will automatically be announced in your own countries' statements channel`
      },
      {
        name: `Viewing Statistics`,
        value: `To view your statistics, run the stats command
        Each Country's Approval Rating, Invest Money, Yearly Income and Special Resource are randomly chosen
        Tip: Investment Money And Yearly Income start off proportional, but are not held to the proportion
        Approval Rating is a scale from 1-100, and is constantly being monitored and affected by your actions
        Your Starting Investment money is set on a scale from 0B - 500B and is randomly generated
        Your special resource is also randomly generated, however this does not limit what you can invest into, only how useful the invested resource will be to you`
      },
      {
        name: `Useful tips`,
        value: `Get Good`
      }
    ]);

    const howTo = new EmbedBuilder().setTitle(`How To Play`).setColor(0x18e1ee);

    howTo.addFields([
      {
        name: `Getting Started`,
        value: `To get started, simply type "/claim" into the general chat and enter your chosen Country!`,
      },
      {
        name: `What Can I Do?`,
        value: `There are many commands to use! Here is a comprehensive list:`,
      },
      {
        name: `/claim`,
        value: `Brings up a input box to enter your Country\nWarning: You can only perform this action once`,
      },
      {
        name: `/stats`,
        value: `List out All of Your Countries Stats\nCritical to the economy of your Country, make sure to check this often!`,
      },
      {
        name: `/alliance`,
        value: `Brings up an input box to form an alliance with another country!\nTo Note: Alliances are only valid if both countries alliance each other`,
      },
      {
        name: `/war`,
        value: `Brings up an input box to create a war with a specified country\nTo Note, A fee of 50B is taken for each war inctited\nIn addition, at least 10 percent of your countries total population must be enrolled in the army`,
      },
      {
        name: `/dissolve`,
        value: `Brings up an input box to dissolve an alliance with the specified group\nNote: This will probaly be outdated in the future`,
      },
      {
        name: `/invest`,
        value: `Brings up an input box to invest in: Your Special Resource, Or any resource specified in the "Resources" Channel`,
      },
      {
        name: `/state`,
        value: `Brings up an input box to type your message in, Which will then be sent to your countries statements channel`
      }
    ]);

    await interaction.reply({
      embeds: [details, howTo],
    });
  },
};
