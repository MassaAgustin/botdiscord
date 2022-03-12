const fs = require("fs");
const slash = [];

module.exports = (client, discord) => {
    //Devuelve todas las carpetas dentro de la carpeta slash Commands y por cada una de ellas...
    fs.readdirSync("./src/slashCommands/").forEach((dir) => {
        //Devuelvo todos los archivos js
        const filesJs = fs.readdirSync(`./src/slashCommands/${dir}`).filter((file) => file.endsWith(".js"));

        for (const fileJs of filesJs) {

            try {
                //Extraemos el archivo en el cual estamos parado.
                const command = require(`../slashCommands/${dir}/${fileJs}`);

                //Al cliente de discord añadimos el comando slash actual.
                if (command.name) {
                    client.slash.set(command.name, command);
                    slash.push(command);
                }
            } catch (err) {
                console.log(`Error al cargar el archivo ${fileJs} por ${err}`);
            }
        }
    });

    client.on("ready", async () => {
        await client.application.commands.set(slash);
    });
};