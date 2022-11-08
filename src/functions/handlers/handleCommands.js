const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync(`./src/commands`);
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        // console.log(
        //   `Command: ${command.data.name} has passed through the handler`
        // );
      }
      console.log(`Loaded Commands`)
    }

    const clientId = "1032947082870403174";
    const guildId = "1032948591112765510";
    const rest = new REST({ version: 9 }).setToken(process.env.token);

    try {
      console.log("Started refreshing application ");
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: client.commandArray,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
