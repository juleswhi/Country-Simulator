require("dotenv").config();
const { token, databaseToken } = process.env;
const { connect } = require("mongoose");
const CountryDataA = require("./commands/tools/stats.js");
const Guild = require("./schemas/guild");
const User = require("./schemas/user");

/*


// Implemintation for a website 


const express = require('express')
const app = express()

app.use(express.static("public"));

app.get("./", function ( req, res )
{
  res.send("Hello World").then(
    console.log(`Send Res`)
    );
  })
  
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server Up on port 3000`)
  });


*/
const {
  Client,
  collection,
  GatewayIntentBits,
  Collection,
} = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: GatewayIntentBits.Guilds });
// client.user.setActivity("activity");
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

// var date = new Date("January 2, 1000, 12:00:00")
// let day = date.getDate()
// console.log(`day is ${day}`)

// const raw = fs.readFileSync("src/CountryData/data.json");
// const CountryData = JSON.parse(raw);
// exports.CountryData = CountryData;

const raw2 = fs.readFileSync("src/CountryData/countries.json");
const countries = JSON.parse(raw2);
exports.Countries = countries;

const raw3 = fs.readFileSync("src/CountryData/SpecialResources.json");
const Resources = JSON.parse(raw3);
exports.Resources = Resources;

const raw5 = fs.readFileSync("src/CountryData/Names.json");
const Names = JSON.parse(raw5);
exports.Names = Names;

const raw4 = fs.readdirSync("src/CountryData/companies");
var companies = [];
for (const company of raw4) {
  const comp = fs.readFileSync(`src/CountryData/companies/${company}`);
  const compProfile = JSON.parse(comp);
  companies.push(compProfile);
}
console.log(`All Countries Are ${companies.length}`);
console.log(`Country 1: ${companies[0]}`);
exports.Companies = companies;

// (async () => {
//     const UserData = await User.find({
//         userName: interaction.user.tag,
//       });
//       const CDB = JSON.parse(UserData);
//       exports.CountryData = CBD;
// })

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));

  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);
(async () => {
  console.log(`Connect To Bot ${token}`);
  console.log(`Connected To Database ${databaseToken}`);
  await connect(databaseToken).catch(console.error);
})();


setInterval(async () => {
  var guildProfile = await Guild.findOne({ guildName: 'Discord United Nations' });
  var oldDate = new Date(guildProfile.Year);
  var newDate = new Date(oldDate.setMonth(oldDate.getMonth() + 1));
  guildProfile.Year = newDate.toUTCString();
  await guildProfile.save().then(console.log(`Current Date is ${guildProfile.Year}`)).catch(console.error);

}, 1000 * 60 * 60 * 2);
