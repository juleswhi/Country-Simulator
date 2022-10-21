require("dotenv").config();
const { token } = process.env;

<<<<<<< HEAD
const {
  Client,
  collection,
  GatewayIntentBits,
  Collection,
} = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.buttons = new Collection();
client.commandArray = [];

const raw = fs.readFileSync("src/CountryData/data.json");
=======
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs')

const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.commandArray = [];

const raw = fs.readFileSync('src/CountryData/data.json');
>>>>>>> main
const CountryData = JSON.parse(raw);
exports.CountryData = CountryData;

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));

<<<<<<< HEAD
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);
=======


const functionFolders = fs.readdirSync('./src/functions')
for(const folder of functionFolders)
{
    const functionFiles = fs.readdirSync(`./src/functions/${folder}`)
        .filter( (file) => file.endsWith(".js"));

    for(const file of functionFiles){
        require(`src/functions/${folder}/${file}`);
    }
}


client.handleEvents();
client.handleCommands();
client.login(token);
>>>>>>> main
