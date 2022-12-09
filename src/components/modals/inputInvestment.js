const mongoose = require("mongoose");
const User = require("../../schemas/user");
const Company = require("../../schemas/company")
const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')



module.exports = {
  data: {
    name: `inputInvestment`,
  },
  async execute(interaction, client) { },
  async run(interaction, client) {
    const invest = interaction.fields
      .getTextInputValue("investInput")
      .toLowerCase();

    const companies = await Company.find();
    let cName;
    // console.log(companies);
    for (const company of companies) {
      if (company.Name.toLowerCase() === invest) cName = company.Name;

    }

    const user = await User.findOne({ userName: interaction.user.tag });
    console.log(user.Invested);

    // check if company is invested before
    // if not, then set 1b
    // else fibonacci
    let cost = "1"

    const fibonacciSequence = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]

    for (const invested of user.Invested) {
      if (invested.Name === cName) {
        cost = fibonacciSequence[invested.Amount];
        invested.Cost = fibonacciSequence[invested.Amount + 1];
        invested.Amount += 1;
        user.save();
        var isInvest = true;
        break;
      }
    }

    let newUser = await User.findOne({ userName: interaction.user.tag });
    let newInvest;
    if (isInvest) return;
    newInvest = {
      Name: cName,
      Cost: cost,
      Amount: 1
    }


    newUser.Invested.push(newInvest);
    newUser.save();

    const u = User.findOne({ userName: interaction.user.tag });
    console.log(u);

    interaction.reply("Invested");


    console.log(user.Invested);
  },
};
