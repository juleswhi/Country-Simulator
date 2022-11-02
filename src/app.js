require("dotenv").config();
const { token, databaseToken } = process.env;
const { connect } = require("mongoose");
const CountryDataA = require("./commands/tools/stats.js");
const User = require("./schemas/user");
const express = require('express')
const app = express()

app.use(express.static("public"));

app.get("/", function ( req, res )
{
  res.send("Hello World")
})


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

// const raw = fs.readFileSync("src/CountryData/data.json");
// const CountryData = JSON.parse(raw);
// exports.CountryData = CountryData;

const raw2 = fs.readFileSync("src/CountryData/countries.json");
const countries = JSON.parse(raw2);
exports.Countries = countries;

const raw3 = fs.readFileSync("src/CountryData/SpecialResources.json");
const Resources = JSON.parse(raw3);
exports.Resources = Resources;

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

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server Up on port 3000`)
});