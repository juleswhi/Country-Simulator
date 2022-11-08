const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");
const mongoose = require("mongoose");
const App = require("../../app.js");
const Country = require("../../schemas/country");
const Guild = require("../../schemas/guild");
const Company = require("../../schemas/company");
const Sector = require("../../schemas/sector");
const Resource = require("../../schemas/resource");
const warName = require("../../schemas/warName.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("company")
    .setDescription("a")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    // const companies = App.Companies;

    // console.log(`First Company Entry Is: ${companies[0]}`);
    // console.log(`Second Company Entry Is: ${companies[1]}`);
    // console.log(`Third Company Entry Is: ${companies[2]}`);
    // console.log(`Fourth Company Entry Is: ${companies[3]}`);

    // code for adding countries

    // const raw4 = fs.readdirSync("src/CountryData/companies");
    // var companyProfile;
    // // var companies = [];
    // for (const company of raw4) {
    //   const comp = await fs.readFileSync(
    //     `src/CountryData/companies/${company}`
    //   );
    //   //   console.log(`Comp Is: ${await comp.Name}`)

    //   const profile = JSON.parse(comp);
    //   companyProfile = await new Company({
    //     _id: mongoose.Types.ObjectId(),
    //     Name: profile.Name,
    //     Sector: profile.Sector,
    //     Symbol: profile.Symbol,
    //   });
    //   await companyProfile
    //     .save()
    //     .then(
    //       console.log(
    //         `Company ${companyProfile.Name} has been added to Profile`
    //       )
    //     )
    //     .catch(console.error);
    // }

    // code for sectors

    // const Companies = await Company.find();
    // var companies = [];
    // for (const company of Companies) {
    //   // console.log(company.Sector);
    //   if (!companies.find((element) => element === company.Sector)) {
    //     companies.push(company.Sector);
    //   }

    //   // const found = companies.find(element => element === company.Sector);
    //   // if(found)
    //   // {
    //   //     console.log(`found comapny: ${company.Name} with secotr: ${company.Sector}`)
    //   // }
    // }
    // console.log(companies);
    // for (const comp of companies) {
    //   var benefit = [];
    //   var rating;

    //   switch (comp) {
    //     case "Health Care":
    //       benefit = ["PopulationIncrease", "EconomyRating"];
    //       rating = 2;
    //       break;
    //     case "Industrials":
    //       benefit = ["MoneyIncrease"];
    //       rating = 3;
    //       break;
    //     case "Information Technology":
    //       benefit = ["MoneyIncrease", "EconomyRating"];
    //       rating = 5;
    //       break;
    //     case "Materials":
    //       benefit = ["EconomyRating"];
    //       rating = 3;
    //       break;
    //     case "Financials":
    //       benefit = ["MoneyIncrease"];
    //       rating = 1;
    //       break;
    //     case "Communication Services":
    //       benefit = ["Popularity"];
    //       rating = 2;
    //       break;
    //     case "Energy":
    //       benefit = ["ApprovalRating", "EconomyRating"];
    //       rating = 2;
    //     case "Consumer Discretionary":
    //       benefit = ["MoneyIncrease"];
    //       rating = 1;
    //       break;
    //     case "Consumer Staples":
    //       benefit = ["MoneyIncrease", "EconomyRating"];
    //       rating = 3;
    //       break;
    //     case "Utilities":
    //       benefit = ["ApprovalRating", "EconomyRating"];
    //       rating = 4;
    //       break;
    //     case "Real Estate":
    //       benefit = ["PopulationIncrease"];
    //       rating = 2;
    //       break;

    //     default:
    //       break;
    //   }

    //   const sectorProfile = await new Sector({
    //     _id: mongoose.Types.ObjectId(),
    //     Name: comp,
    //     Benefit: benefit,
    //     Rating: rating,
    //   });
    //   await sectorProfile
    //     .save()
    //     .then(
    //       console.log(
    //         `Logged ${sectorProfile.Name} with benefits ${sectorProfile.benefit}`
    //       )
    //     )
    //     .catch(console.error);
    // }

    // code for resources

    // const resources = App.Resources;
    // // console.log(resources);
    // for (const resource in resources) {
    // //   console.log(Math.floor(Math.random() * 100));
    //   const resourceProfile = await new Resource({
    //     _id: mongoose.Types.ObjectId(),
    //     Name: resources[resource],
    //     UniversalValueRating: Math.floor(Math.random() * 100),
    //   });
    // //   console.log(resourceProfile);
    //   resourceProfile
    //     .save()
    //     .then(console.log(`Saved Profile ${resourceProfile}`))
    //     .catch(console.error);
    // }

    // code for war names

    const guild = await Guild.findOne({ guildId: interaction.guild.id });
    const names = App.Names;
    for (const name of names) {
      console.log(`Added ${name}`);
      const nameProfile = await new warName({
        _id: name,
        Name: name,
        // Date: guild.Year
      });
      await nameProfile
        .save()
        .then(console.log(`Created War Name`))
        .catch(console.error);
    }

    // code for countries

    // const raw = fs.readFileSync(`./src/CountryData/countries.json`);
    // const countryAll = JSON.parse(raw);
    // console.log(`All Countries Parsed =\n\n ${countryAll}\n\n`)
    // for(const country of countryAll)
    // {
    //   const countryProfile = await new Country({
    //     _id: mongoose.Types.ObjectId(),
    //     country: country.country,
    //     population: country.population
    //   });
    //   countryProfile.save().then(console.log(`saved countryProfile${countryProfile}`)).catch(console.error)
    // }

    try {
      await interaction.reply({ content: `Working On It` });
    } catch (error) {}
  },
};
