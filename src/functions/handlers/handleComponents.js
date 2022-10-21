const fs = require("fs");

module.export = (client) => {
  client.handleComponents = async () => {
    const componentFolder = fs.readdirSync("./src/components");
    for (const folder of componentFolder) {
      const componentFiles = fs
        .readdirSync(`./src/components/${folder}`)
        .filter((file) => file.endsWith(".js"));

        switch(folder) {
            case "buttons":
                for(const file of componentFiles)
                {
                    const button = require(`../../components/${folder}/${file}`)
                    
                }

                break;
            
            default:

                break;

        }
    }
  };
};
